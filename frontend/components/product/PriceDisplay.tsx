import { formatInstallments, formatPrice } from "@/lib/formatters/price";

type PriceDisplayProps = {
  priceCents: number;
  from?: boolean; // mostra "a partir de" quando o produto tem variantes com preços diferentes
  showInstallments?: boolean;
};

export function PriceDisplay({ priceCents, from = false, showInstallments = false }: PriceDisplayProps) {
  return (
    <div>
      <p className="text-lg font-semibold text-charcoal">
        {from && <span className="mr-1 text-sm font-normal text-muted">a partir de</span>}
        {formatPrice(priceCents)}
      </p>
      {showInstallments && (
        <p className="text-xs text-muted">ou {formatInstallments(priceCents)} sem juros</p>
      )}
    </div>
  );
}
