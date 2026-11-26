import type { StockStatus } from "@/types/catalog";

// O estado é sempre dito em texto, não só pela cor (exigência de acessibilidade do brief).
const config: Record<StockStatus, { label: string; className: string }> = {
  in_stock: { label: "Disponível", className: "bg-olive/15 text-forest" },
  low_stock: { label: "Últimas unidades", className: "bg-stock-low/15 text-stock-low" },
  out_of_stock: { label: "Esgotado", className: "bg-stock-out/10 text-stock-out" },
};

export function StockBadge({ status }: { status: StockStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
