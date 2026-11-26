import { Router } from "express";
import { prisma } from "../db.js";
import { HttpError } from "../middleware/error.js";
import { serializeProduct, serializeStock } from "../lib/serialize.js";

export const productsRouter = Router();

const include = {
  category: true,
  images: true,
  variants: { include: { stock: true } },
  fragrance: true,
} as const;

/** GET /products (filtro opcional por categoria) */
productsRouter.get("/", async (req, res) => {
  const categorySlug = typeof req.query.category === "string" ? req.query.category : undefined;
  const products = await prisma.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : undefined,
    include,
    orderBy: { createdAt: "desc" },
  });
  res.json(products.map(serializeProduct));
});

/** GET /products/:slug */
productsRouter.get("/:slug", async (req, res) => {
  const product = await prisma.product.findUnique({ where: { slug: req.params.slug }, include });
  if (!product) throw new HttpError(404, "Produto não encontrado");
  res.json(serializeProduct(product));
});

/** GET /products/:id/stock — :id é o id do produto, não o slug */
productsRouter.get("/:id/stock", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: { variants: { include: { stock: true } } },
  });
  if (!product) throw new HttpError(404, "Produto não encontrado");

  const stock = product.variants.map((variant) => variant.stock).filter((s) => s !== null);
  res.json(stock.map(serializeStock));
});
