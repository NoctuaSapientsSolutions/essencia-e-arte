import type { CartItem, Product, Variant } from "@/types/catalog";
import { apiFetch } from "@/lib/api/client";

// POST /cart/validate: confere estoque e preço atual de cada item no backend.

export type CartIssue =
  | { variantId: string; kind: "out_of_stock" }
  | { variantId: string; kind: "insufficient_stock"; available: number }
  | { variantId: string; kind: "unavailable" };

export interface ValidatedLine {
  item: CartItem;
  product: Product;
  variant: Variant;
  unitPriceCents: number;
  lineTotalCents: number;
  available: number;
  issue?: CartIssue;
}

export interface CartValidation {
  lines: ValidatedLine[];
  subtotalCents: number;
  issues: CartIssue[];
  canCheckout: boolean;
}

export async function validateCart(items: CartItem[]): Promise<CartValidation> {
  if (items.length === 0) return { lines: [], subtotalCents: 0, issues: [], canCheckout: false };
  return apiFetch<CartValidation>("/cart/validate", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
}

// Cupons do protótipo: a validação de autoridade acontece no backend ao criar o pedido.
const mockCoupons: Record<string, { percent: number; label: string }> = {
  ESSENCIA10: { percent: 10, label: "10% de desconto" },
  BEMVINDO: { percent: 5, label: "5% de desconto na primeira compra" },
};

export function applyMockCoupon(code: string): { percent: number; label: string } | null {
  return mockCoupons[code.trim().toUpperCase()] ?? null;
}
