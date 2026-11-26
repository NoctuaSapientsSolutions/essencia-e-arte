import { categories, products, stock } from "@/lib/mocks/catalog";
import type { Category, Product, Stock } from "@/types/catalog";

// Camada de acesso aos dados. Hoje lê dos mocks; quando a API REST existir,
// troque o corpo destas funções por fetch() sem mudar quem as chama.

const SIMULATED_DELAY_MS = 0;

async function delay<T>(value: T): Promise<T> {
  if (SIMULATED_DELAY_MS > 0) {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
  }
  return value;
}

/** GET /categories */
export async function getCategories(): Promise<Category[]> {
  return delay(categories);
}

/** GET /products (filtro opcional por categoria) */
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const list = categorySlug
    ? products.filter((p) => p.categorySlug === categorySlug)
    : products;
  return delay(list);
}

/** GET /products/:slug — retorna null se o produto não existir */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return delay(products.find((p) => p.slug === slug) ?? null);
}

/** GET /products/:id/stock */
export async function getStockForProduct(productId: string): Promise<Stock[]> {
  const product = products.find((p) => p.id === productId);
  const variantIds = new Set(product?.variants.map((v) => v.id));
  return delay(stock.filter((s) => variantIds.has(s.variantId)));
}
