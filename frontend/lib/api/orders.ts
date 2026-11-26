import { apiFetch } from "@/lib/api/client";
import type { PaymentMethodId } from "@/lib/api/checkout";

export interface OrderItemSummary {
  productName: string;
  variantLabel: string;
  sku: string;
  unitPriceCents: number;
  quantity: number;
  lineTotalCents: number;
}

export interface OrderSummary {
  orderId: string;
  createdAt: string;
  status: "pending" | "paid" | "shipped" | "cancelled";
  paymentMethod: PaymentMethodId;
  shippingLabel: string;
  subtotalCents: number;
  discountCents: number;
  shippingPriceCents: number;
  totalCents: number;
  items: OrderItemSummary[];
}

/** GET /orders */
export async function getMyOrders(token: string): Promise<OrderSummary[]> {
  return apiFetch<OrderSummary[]>("/orders", { headers: { Authorization: `Bearer ${token}` } });
}
