export interface PaymentMethodOption {
  id: "pix" | "cartao" | "boleto";
  label: string;
  description: string;
  discountPercent?: number;
}

export const paymentMethods: PaymentMethodOption[] = [
  { id: "pix", label: "Pix", description: "Aprovação imediata, com 5% de desconto.", discountPercent: 5 },
  { id: "cartao", label: "Cartão de crédito", description: "Em até 3x sem juros." },
  { id: "boleto", label: "Boleto bancário", description: "Compensação em até 2 dias úteis." },
];

export type PaymentMethodId = PaymentMethodOption["id"];

export function discountPercentFor(methodId: string): number {
  return paymentMethods.find((method) => method.id === methodId)?.discountPercent ?? 0;
}
