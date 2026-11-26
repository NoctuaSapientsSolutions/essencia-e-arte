import { apiFetch } from "@/lib/api/client";

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

/** POST /shipping/quote */
export async function quoteShipping(cep: string): Promise<ShippingOption[] | null> {
  if (!isValidCep(cep)) return null;
  const { options } = await apiFetch<{ options: ShippingOption[] }>("/shipping/quote", {
    method: "POST",
    body: JSON.stringify({ cep }),
  });
  return options;
}
