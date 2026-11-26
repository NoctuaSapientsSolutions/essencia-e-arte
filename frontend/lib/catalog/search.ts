import { PAGE_SIZE } from "@/lib/catalog/filters";
import type { Product } from "@/types/catalog";

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function scoreProduct(product: Product, query: string): number {
  const name = normalize(product.name);
  const description = normalize(product.shortDescription);

  if (name === query) return 100;
  if (name.startsWith(query)) return 50;
  let score = 0;
  if (name.includes(query)) score += 20;
  if (description.includes(query)) score += 5;
  return score;
}

/** Busca por nome e descrição, ordenada por relevância. Vazio se a busca estiver em branco. */
export function searchProducts(products: Product[], query: string): Product[] {
  const normalized = normalize(query);
  if (!normalized) return [];

  return products
    .map((product) => ({ product, score: scoreProduct(product, normalized) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product);
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
}

export function paginate<T>(items: T[], page: number): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  return {
    items: items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    page: safePage,
    totalPages,
    total,
  };
}
