"use client";

type QuantitySelectorProps = {
  value: number;
  max: number; // estoque disponível da variante selecionada
  onChange: (value: number) => void;
};

export function QuantitySelector({ value, max, onChange }: QuantitySelectorProps) {
  const clamp = (n: number) => Math.min(Math.max(1, n), Math.max(1, max));

  return (
    <div className="inline-flex items-center rounded-md border border-border">
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= 1}
        aria-label="Diminuir quantidade"
        className="flex h-11 w-11 items-center justify-center text-lg text-forest hover:bg-cream disabled:text-muted disabled:hover:bg-transparent"
      >
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value) || 1))}
        aria-label="Quantidade"
        className="h-11 w-14 border-x border-border bg-transparent text-center text-sm [appearance:textfield] focus-visible:outline-2"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
        className="flex h-11 w-11 items-center justify-center text-lg text-forest hover:bg-cream disabled:text-muted disabled:hover:bg-transparent"
      >
        +
      </button>
    </div>
  );
}
