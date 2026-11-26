"use client";

import { paymentMethods, type PaymentMethodId } from "@/lib/api/checkout";

type PaymentMethodSelectorProps = {
  selectedId: PaymentMethodId;
  onSelect: (id: PaymentMethodId) => void;
};

export function PaymentMethodSelector({ selectedId, onSelect }: PaymentMethodSelectorProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">Forma de pagamento</legend>
      {paymentMethods.map((method) => {
        const selected = method.id === selectedId;
        return (
          <label
            key={method.id}
            className={`flex cursor-pointer items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm transition-colors ${
              selected ? "border-forest bg-cream" : "border-border hover:border-forest"
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="pagamento"
                value={method.id}
                checked={selected}
                onChange={() => onSelect(method.id)}
                className="h-4 w-4 accent-forest"
              />
              <span>
                <span className="block font-medium text-charcoal">{method.label}</span>
                <span className="block text-muted">{method.description}</span>
              </span>
            </span>
            {method.discountPercent && (
              <span className="rounded-pill bg-olive/15 px-2.5 py-1 text-xs font-medium text-forest">
                −{method.discountPercent}%
              </span>
            )}
          </label>
        );
      })}
    </fieldset>
  );
}
