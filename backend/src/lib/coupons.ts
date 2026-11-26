// Cupons do protótipo. Numa loja real isso viraria uma tabela própria.
export const coupons: Record<string, { percent: number; label: string }> = {
  ESSENCIA10: { percent: 10, label: "10% de desconto" },
  BEMVINDO: { percent: 5, label: "5% de desconto na primeira compra" },
};

export function applyCoupon(code: string): { percent: number; label: string } | null {
  return coupons[code.trim().toUpperCase()] ?? null;
}
