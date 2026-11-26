"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonBlock } from "@/components/ui/SkeletonLoader";
import { getMyOrders, type OrderSummary } from "@/lib/api/orders";
import { formatPrice } from "@/lib/formatters/price";

const STATUS_LABEL: Record<OrderSummary["status"], string> = {
  pending: "Aguardando pagamento",
  paid: "Pagamento confirmado",
  shipped: "Enviado",
  cancelled: "Cancelado",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export function OrderHistory({ token }: { token: string }) {
  const [orders, setOrders] = useState<OrderSummary[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getMyOrders(token)
      .then((result) => {
        if (!cancelled) setOrders(result);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (error) {
    return <p className="mt-10 text-center text-sm text-stock-out">Não foi possível carregar seus pedidos agora.</p>;
  }

  if (!orders) {
    return (
      <div aria-busy="true" className="mt-10 space-y-4">
        <SkeletonBlock className="h-20 w-full" />
        <SkeletonBlock className="h-20 w-full" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mt-10">
        <EmptyState
          title="Você ainda não fez nenhum pedido"
          description="Quando finalizar uma compra logado, ela aparece aqui."
          actionLabel="Ver essências"
          actionHref="/categorias/essencias"
        />
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-4">
      <h2 className="font-display text-2xl text-forest">Meus pedidos</h2>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li key={order.orderId} className="rounded-lg border border-border bg-background p-4 shadow-card">
            <details>
              <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-charcoal">Pedido {order.orderId}</p>
                  <p className="text-sm text-muted">{formatDate(order.createdAt)} · {STATUS_LABEL[order.status]}</p>
                </div>
                <p className="font-medium text-forest">{formatPrice(order.totalCents)}</p>
              </summary>

              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                {order.items.map((item) => (
                  <li key={item.sku} className="flex justify-between gap-4">
                    <span className="text-charcoal">
                      {item.productName} <span className="text-muted">({item.variantLabel}) × {item.quantity}</span>
                    </span>
                    <span className="font-medium">{formatPrice(item.lineTotalCents)}</span>
                  </li>
                ))}
                <li className="flex justify-between gap-4 text-muted">
                  <span>Frete ({order.shippingLabel})</span>
                  <span>{formatPrice(order.shippingPriceCents)}</span>
                </li>
                {order.discountCents > 0 && (
                  <li className="flex justify-between gap-4 text-muted">
                    <span>Desconto</span>
                    <span>− {formatPrice(order.discountCents)}</span>
                  </li>
                )}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
