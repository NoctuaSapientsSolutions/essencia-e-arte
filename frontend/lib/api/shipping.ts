// Simula POST /shipping/quote: calcula opções de frete a partir do CEP.
// Determinístico pelos dígitos do CEP, para o protótipo parecer uma cotação real
// sem depender de uma API externa dos Correios.

export interface ShippingOption {
  id: string;
  label: string;
  description: string;
  priceCents: number;
}

export function formatCep(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export function isValidCep(value: string): boolean {
  return value.replace(/\D/g, "").length === 8;
}

export function quoteShipping(cep: string): ShippingOption[] | null {
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return null;

  const seed = digits.split("").reduce((sum, digit) => sum + Number(digit), 0);
  const economicPriceCents = 1490 + (seed % 7) * 100;
  const expressPriceCents = economicPriceCents + 1800 + (seed % 5) * 200;
  const economicDays = 5 + (seed % 5);
  const expressDays = 2 + (seed % 3);

  return [
    {
      id: "standard",
      label: "Entrega econômica",
      description: `Chega em até ${economicDays} dias úteis`,
      priceCents: economicPriceCents,
    },
    {
      id: "express",
      label: "Entrega expressa",
      description: `Chega em até ${expressDays} dias úteis`,
      priceCents: expressPriceCents,
    },
  ];
}
