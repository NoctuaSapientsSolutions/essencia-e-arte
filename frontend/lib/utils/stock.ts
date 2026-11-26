import type { Product, Stock, StockStatus } from "@/types/catalog";

/**
 * Resume o estoque de um produto para exibir no card.
 * Regra: se alguma variante estiver disponível, o produto está disponível;
 * se só houver variantes com estoque baixo, mostra "últimas unidades";
 * se todas estiverem esgotadas, mostra "esgotado".
 */
export function summarizeProductStock(product: Product, stock: Stock[]): StockStatus {
  const statuses = product.variants
    .map((variant) => stock.find((s) => s.variantId === variant.id)?.status)
    .filter((status): status is StockStatus => Boolean(status));

  if (statuses.includes("in_stock")) return "in_stock";
  if (statuses.includes("low_stock")) return "low_stock";
  return "out_of_stock";
}

/** Menor preço entre as variantes, usado como "a partir de" no card. */
export function lowestPriceCents(product: Product): number {
  return Math.min(...product.variants.map((v) => v.priceCents));
}
