import { products, stock } from "@/lib/mocks/catalog";
import type { CartItem, Product, Variant } from "@/types/catalog";

// Simula POST /cart/validate: confere estoque e preço atual de cada item.
// Os nomes e a forma do retorno devem bater com o contrato da API real.

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
  available: number; // estoque atual da variante
  issue?: CartIssue;
}

export interface CartValidation {
  lines: ValidatedLine[];
  subtotalCents: number;
  issues: CartIssue[];
  canCheckout: boolean;
}

export function findVariant(variantId: string): { product: Product; variant: Variant } | null {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}

export async function validateCart(items: CartItem[]): Promise<CartValidation> {
  const lines: ValidatedLine[] = [];
  const issues: CartIssue[] = [];

  for (const item of items) {
    const found = findVariant(item.variantId);
    if (!found) {
      const issue: CartIssue = { variantId: item.variantId, kind: "unavailable" };
      issues.push(issue);
      continue;
    }

    const { product, variant } = found;
    const stockEntry = stock.find((s) => s.variantId === variant.id);
    const available = stockEntry?.quantity ?? 0;

    let issue: CartIssue | undefined;
    if (available === 0) issue = { variantId: variant.id, kind: "out_of_stock" };
    else if (item.quantity > available) issue = { variantId: variant.id, kind: "insufficient_stock", available };

    if (issue) issues.push(issue);

    lines.push({
      item,
      product,
      variant,
      unitPriceCents: variant.priceCents,
      lineTotalCents: variant.priceCents * item.quantity,
      available,
      issue,
    });
  }

  const subtotalCents = lines.reduce((total, line) => total + line.lineTotalCents, 0);
  return { lines, subtotalCents, issues, canCheckout: issues.length === 0 && lines.length > 0 };
}

// Cupons de teste do protótipo. Na API real, a validação acontece no backend.
export const mockCoupons: Record<string, { percent: number; label: string }> = {
  ESSENCIA10: { percent: 10, label: "10% de desconto" },
  BEMVINDO: { percent: 5, label: "5% de desconto na primeira compra" },
};

export function applyMockCoupon(code: string): { percent: number; label: string } | null {
  return mockCoupons[code.trim().toUpperCase()] ?? null;
}
