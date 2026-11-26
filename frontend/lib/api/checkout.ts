import { apiFetch } from "@/lib/api/client";

export type PaymentMethodId = "pix" | "cartao" | "boleto";

export interface PaymentMethodOption {
  id: PaymentMethodId;
  label: string;
  description: string;
  discountPercent?: number;
}

// Metadados de exibição; a aplicação do desconto é sempre recalculada no backend ao criar o pedido.
export const paymentMethods: PaymentMethodOption[] = [
  { id: "pix", label: "Pix", description: "Aprovação imediata, com 5% de desconto.", discountPercent: 5 },
  { id: "cartao", label: "Cartão de crédito", description: "Em até 3x sem juros." },
  { id: "boleto", label: "Boleto bancário", description: "Compensação em até 2 dias úteis." },
];

export interface CreateOrderInput {
  customer: { name: string; email: string };
  shipping: { cep: string; address: string; city: string; state: string; optionId: string };
  paymentMethod: PaymentMethodId;
  items: { variantId: string; quantity: number }[];
  couponCode?: string;
}

export interface OrderResult {
  orderId: string;
  createdAt: string;
}

/** POST /orders */
export async function createOrder(input: CreateOrderInput, token?: string | null): Promise<OrderResult> {
  return apiFetch<OrderResult>("/orders", {
    method: "POST",
    body: JSON.stringify(input),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
