"use client";

import { formatPrice } from "@/lib/formatters/price";

export type VariantOption = {
  id: string;
  label: string;
  priceCents: number;
  disabled: boolean;
};

type VariantSelectorProps = {
  legend: string;
  options: VariantOption[];
  selectedId: string;
  onSelect: (id: string) => void;
};

// Grupo de opções com radios, para leitor de tela e teclado. Opções esgotadas ficam
// desabilitadas e com o texto "esgotado", sem depender só da cor.
export function VariantSelector({ legend, options, selectedId, onSelect }: VariantSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-charcoal">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.id === selectedId;
          return (
            <label
              key={option.id}
              className={`relative flex min-h-11 cursor-pointer items-center rounded-md border px-4 text-sm transition-colors ${
                option.disabled
                  ? "cursor-not-allowed border-border text-muted line-through"
                  : selected
                    ? "border-forest bg-forest text-cream"
                    : "border-border text-forest hover:border-forest"
              }`}
            >
              <input
                type="radio"
                name="variante"
                value={option.id}
                checked={selected}
                disabled={option.disabled}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <span>{option.label}</span>
              <span className="ml-2 text-xs opacity-80">{formatPrice(option.priceCents)}</span>
              {option.disabled && <span className="sr-only"> (esgotado)</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
