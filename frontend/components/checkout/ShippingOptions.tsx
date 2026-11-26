"use client";

import { formatPrice } from "@/lib/formatters/price";
import type { ShippingOption } from "@/lib/api/shipping";

type ShippingOptionsProps = {
  options: ShippingOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function ShippingOptions({ options, selectedId, onSelect }: ShippingOptionsProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">Forma de envio</legend>
      {options.map((option) => {
        const selected = option.id === selectedId;
        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm transition-colors ${
              selected ? "border-forest bg-cream" : "border-border hover:border-forest"
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="frete"
                value={option.id}
                checked={selected}
                onChange={() => onSelect(option.id)}
                className="h-4 w-4 accent-forest"
              />
              <span>
                <span className="block font-medium text-charcoal">{option.label}</span>
                <span className="block text-muted">{option.description}</span>
              </span>
            </span>
            <span className="font-medium text-forest">{formatPrice(option.priceCents)}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
