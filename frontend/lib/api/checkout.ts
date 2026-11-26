// Simula POST /orders: na API real, cria o pedido no backend e retorna o identificador.

export type PaymentMethodId = "pix" | "cartao" | "boleto";

export interface PaymentMethodOption {
  id: PaymentMethodId;
  label: string;
  description: string;
  discountPercent?: number;
}

export const paymentMethods: PaymentMethodOption[] = [
  { id: "pix", label: "Pix", description: "Aprovação imediata, com 5% de desconto.", discountPercent: 5 },
  { id: "cartao", label: "Cartão de crédito", description: "Em até 3x sem juros." },
  { id: "boleto", label: "Boleto bancário", description: "Compensação em até 2 dias úteis." },
];

export interface OrderResult {
  orderId: string;
  createdAt: string;
}

export async function createMockOrder(): Promise<OrderResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const orderId = `EA-${Math.floor(100000 + Math.random() * 900000)}`;
  return { orderId, createdAt: new Date().toISOString() };
}
