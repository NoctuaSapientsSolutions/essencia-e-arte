import type { Category, Product, Stock } from "@/types/catalog";
import { ApiError, apiFetch } from "@/lib/api/client";

// Camada de acesso aos dados do catálogo, consumindo a API REST do backend.

/** GET /categories */
export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

/** GET /products (filtro opcional por categoria) */
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const query = categorySlug ? `?category=${encodeURIComponent(categorySlug)}` : "";
  return apiFetch<Product[]>(`/products${query}`);
}

/** GET /products/:slug — retorna null se o produto não existir */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/products/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

/** GET /products/:id/stock */
export async function getStockForProduct(productId: string): Promise<Stock[]> {
  return apiFetch<Stock[]>(`/products/${encodeURIComponent(productId)}/stock`);
}
