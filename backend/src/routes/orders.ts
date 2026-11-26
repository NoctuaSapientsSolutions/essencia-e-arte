import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { HttpError } from "../middleware/error.js";
import { optionalAuth } from "../middleware/auth.js";
import { isValidCep, quoteShipping } from "../lib/shippingQuote.js";
import { applyCoupon } from "../lib/coupons.js";
import { discountPercentFor, paymentMethods } from "../lib/paymentMethods.js";
import { generateOrderCode } from "../lib/orderCode.js";

export const ordersRouter = Router();

ordersRouter.get("/payment-methods", (_req, res) => {
  res.json(paymentMethods);
});

const bodySchema = z.object({
  customer: z.object({ name: z.string().min(1), email: z.string().email() }),
  shipping: z.object({
    cep: z.string(),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    optionId: z.enum(["standard", "express"]),
  }),
  paymentMethod: z.enum(["pix", "cartao", "boleto"]),
  items: z.array(z.object({ variantId: z.string(), quantity: z.number().int().positive() })).min(1),
  couponCode: z.string().optional(),
});

/** POST /orders: valida estoque, calcula frete/desconto no servidor e cria o pedido. */
ordersRouter.post("/", optionalAuth, async (req, res) => {
  const body = bodySchema.parse(req.body);

  if (!isValidCep(body.shipping.cep)) throw new HttpError(400, "CEP inválido");
  const shippingOptions = quoteShipping(body.shipping.cep);
  const shippingOption = shippingOptions?.find((option) => option.id === body.shipping.optionId);
  if (!shippingOption) throw new HttpError(400, "Opção de frete inválida");

  const variants = await prisma.variant.findMany({
    where: { id: { in: body.items.map((item) => item.variantId) } },
    include: { stock: true, product: true },
  });
  const byId = new Map(variants.map((variant) => [variant.id, variant]));

  let subtotalCents = 0;
  const lines: { variantId: string; quantity: number; unitPriceCents: number; sku: string; label: string; productName: string }[] = [];

  for (const item of body.items) {
    const variant = byId.get(item.variantId);
    if (!variant) throw new HttpError(400, `Item indisponível: ${item.variantId}`);
    const available = variant.stock?.quantity ?? 0;
    if (available < item.quantity) throw new HttpError(409, `Estoque insuficiente para ${variant.label}`);

    subtotalCents += variant.priceCents * item.quantity;
    lines.push({
      variantId: variant.id,
      quantity: item.quantity,
      unitPriceCents: variant.priceCents,
      sku: variant.sku,
      label: variant.label,
      productName: variant.product.name,
    });
  }

  const coupon = body.couponCode ? applyCoupon(body.couponCode) : null;
  const couponDiscountCents = coupon ? Math.round((subtotalCents * coupon.percent) / 100) : 0;
  const paymentDiscountPercent = discountPercentFor(body.paymentMethod);
  const paymentDiscountCents = Math.round(((subtotalCents - couponDiscountCents) * paymentDiscountPercent) / 100);
  const discountCents = couponDiscountCents + paymentDiscountCents;
  const totalCents = subtotalCents - discountCents + shippingOption.priceCents;

  const order = await prisma.$transaction(async (tx) => {
    for (const line of lines) {
      const updated = await tx.stock.updateMany({
        where: { variantId: line.variantId, quantity: { gte: line.quantity } },
        data: { quantity: { decrement: line.quantity } },
      });
      if (updated.count === 0) throw new HttpError(409, `Estoque insuficiente para ${line.label}`);
    }

    return tx.order.create({
      data: {
        orderCode: generateOrderCode(),
        userId: req.auth?.userId,
        customerName: body.customer.name,
        customerEmail: body.customer.email,
        shippingCep: body.shipping.cep,
        shippingAddress: body.shipping.address,
        shippingCity: body.shipping.city,
        shippingState: body.shipping.state,
        shippingOptionId: shippingOption.id,
        shippingLabel: shippingOption.label,
        shippingPriceCents: shippingOption.priceCents,
        paymentMethod: body.paymentMethod,
        subtotalCents,
        discountCents,
        totalCents,
        items: {
          create: lines.map((line) => ({
            variantId: line.variantId,
            productName: line.productName,
            variantLabel: line.label,
            sku: line.sku,
            unitPriceCents: line.unitPriceCents,
            quantity: line.quantity,
            lineTotalCents: line.unitPriceCents * line.quantity,
          })),
        },
      },
    });
  });

  // Em paralelo, cada quantidade de estoque já foi re-sincronizada; recalcula o status.
  await syncStockStatus(lines.map((line) => line.variantId));

  res.status(201).json({ orderId: order.orderCode, createdAt: order.createdAt.toISOString() });
});

async function syncStockStatus(variantIds: string[]) {
  const { statusForQuantity } = await import("../lib/stockStatus.js");
  const stocks = await prisma.stock.findMany({ where: { variantId: { in: variantIds } } });
  await Promise.all(
    stocks.map((stock) =>
      prisma.stock.update({ where: { variantId: stock.variantId }, data: { status: statusForQuantity(stock.quantity) } })
    )
  );
}
