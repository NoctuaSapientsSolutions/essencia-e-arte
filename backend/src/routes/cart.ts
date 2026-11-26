import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { serializeProduct } from "../lib/serialize.js";

export const cartRouter = Router();

const cartItemSchema = z.object({
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int().positive(),
});

const bodySchema = z.object({ items: z.array(cartItemSchema) });

type CartIssue =
  | { variantId: string; kind: "out_of_stock" }
  | { variantId: string; kind: "insufficient_stock"; available: number }
  | { variantId: string; kind: "unavailable" };

/** POST /cart/validate: confere estoque e preço atual de cada item. */
cartRouter.post("/validate", async (req, res) => {
  const { items } = bodySchema.parse(req.body);

  const variants = await prisma.variant.findMany({
    where: { id: { in: items.map((item) => item.variantId) } },
    include: {
      stock: true,
      product: {
        include: { category: true, images: true, variants: { include: { stock: true } }, fragrance: true },
      },
    },
  });
  const byId = new Map(variants.map((variant) => [variant.id, variant]));

  const lines = [];
  const issues: CartIssue[] = [];

  for (const item of items) {
    const variant = byId.get(item.variantId);
    if (!variant) {
      issues.push({ variantId: item.variantId, kind: "unavailable" });
      continue;
    }

    const available = variant.stock?.quantity ?? 0;
    let issue: CartIssue | undefined;
    if (available === 0) issue = { variantId: variant.id, kind: "out_of_stock" };
    else if (item.quantity > available) issue = { variantId: variant.id, kind: "insufficient_stock", available };
    if (issue) issues.push(issue);

    lines.push({
      item,
      product: serializeProduct(variant.product),
      variant: { id: variant.id, sku: variant.sku, label: variant.label, attributes: variant.attributes, priceCents: variant.priceCents },
      unitPriceCents: variant.priceCents,
      lineTotalCents: variant.priceCents * item.quantity,
      available,
      issue,
    });
  }

  const subtotalCents = lines.reduce((total, line) => total + line.lineTotalCents, 0);
  res.json({ lines, subtotalCents, issues, canCheckout: issues.length === 0 && lines.length > 0 });
});
