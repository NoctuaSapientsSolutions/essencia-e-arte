import { StockStatus } from "@prisma/client";

const LOW_STOCK_THRESHOLD = 10;

export function statusForQuantity(quantity: number): StockStatus {
  if (quantity <= 0) return "out_of_stock";
  if (quantity <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}
