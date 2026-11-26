"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonBlock } from "@/components/ui/SkeletonLoader";
import { applyMockCoupon, validateCart, type CartValidation, type CartIssue } from "@/lib/api/cart";
import { useCart } from "@/lib/cart/CartContext";
import { WHATSAPP_URL } from "@/lib/config";
import { formatPrice } from "@/lib/formatters/price";
import { QuantitySelector } from "@/components/product/QuantitySelector";

const issueMessage = (issue: CartIssue): string => {
  switch (issue.kind) {
    case "out_of_stock":
      return "Esgotado. Remova este item para continuar.";
    case "insufficient_stock":
      return `Restam apenas ${issue.available} unidades. Ajuste a quantidade.`;
    default:
      return "Este item não está mais disponível.";
  }
};

export function CartView() {
  const { items, ready, setQuantity, removeItem } = useCart();
  const [validation, setValidation] = useState<CartValidation | null>(null);
  const [checking, setChecking] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; percent: number; label: string } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Revalida sempre que os itens mudam, como faria o POST /cart/validate.
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecking(true);
    validateCart(items).then((result) => {
      if (cancelled) return;
      setValidation(result);
      setChecking(false);
    });
    return () => {
      cancelled = true;
    };
  }, [items, ready]);

  if (!ready) {
    return (
      <div aria-busy="true" className="space-y-4">
        <SkeletonBlock className="h-24 w-full" />
        <SkeletonBlock className="h-24 w-full" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Seu carrinho está vazio"
        description="Escolha suas essências, frascos e kits para começar."
        actionLabel="Ver essências"
        actionHref="/categorias/essencias"
      />
    );
  }

  const issuesByVariant = new Map<string, CartIssue>();
  validation?.issues.forEach((issue) => issuesByVariant.set(issue.variantId, issue));

  const discount = coupon && validation ? Math.round((validation.subtotalCents * coupon.percent) / 100) : 0;
  const total = (validation?.subtotalCents ?? 0) - discount;

  const applyCoupon = () => {
    const found = applyMockCoupon(couponInput);
    if (!found) {
      setCoupon(null);
      setCouponError("Cupom inválido ou expirado.");
      return;
    }
    setCoupon({ code: couponInput.trim().toUpperCase(), ...found });
    setCouponError(null);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <section aria-labelledby="itens-titulo">
        <h2 id="itens-titulo" className="sr-only">Itens do carrinho</h2>

        <ul className="divide-y divide-border border-y border-border">
          {(validation?.lines ?? []).map((line) => {
            const issue = issuesByVariant.get(line.variant.id);
            return (
              <li key={line.variant.id} className="flex gap-4 py-6">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-cream">
                  {line.product.images[0] && (
                    <Image
                      src={line.product.images[0].src}
                      alt={line.product.images[0].alt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <Link href={`/produtos/${line.product.slug}`} className="font-display text-xl text-forest hover:underline">
                        {line.product.name}
                      </Link>
                      <p className="text-sm text-muted">{line.variant.label}</p>
                    </div>
                    <p className="font-medium">{formatPrice(line.lineTotalCents)}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <QuantitySelector
                      value={line.item.quantity}
                      max={Math.max(1, line.available)}
                      onChange={(value) => setQuantity(line.variant.id, value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(line.variant.id)}
                      className="h-11 px-2 text-sm text-forest underline underline-offset-4 hover:text-stock-out"
                    >
                      Remover
                    </button>
                  </div>

                  {issue && (
                    <p role="alert" className="text-sm text-stock-out">
                      {issueMessage(issue)}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {validation && validation.issues.some((i) => !validation.lines.some((l) => l.variant.id === i.variantId)) && (
          <p role="alert" className="mt-4 text-sm text-stock-out">
            Alguns itens não estão mais disponíveis e foram ignorados.
          </p>
        )}
      </section>

      <aside aria-labelledby="resumo-titulo" className="h-fit space-y-6 rounded-lg border border-border bg-background p-6 shadow-card">
        <h2 id="resumo-titulo" className="font-display text-2xl text-forest">Resumo</h2>

        <div className="space-y-2 text-sm">
          <Row label="Subtotal" value={formatPrice(validation?.subtotalCents ?? 0)} loading={checking} />
          {coupon && <Row label={`Cupom ${coupon.code}`} value={`− ${formatPrice(discount)}`} />}
          <Row label="Frete" value="Calculado no checkout" />
        </div>

        <div className="border-t border-border pt-4">
          <Row label="Total estimado" value={formatPrice(total)} strong />
        </div>

        <div>
          <label htmlFor="cupom" className="text-sm font-medium text-charcoal">Cupom de desconto</label>
          <div className="mt-2 flex gap-2">
            <input
              id="cupom"
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value)}
              aria-describedby={couponError ? "cupom-erro" : undefined}
              className="h-11 flex-1 rounded-md border border-border bg-background px-3 text-sm uppercase"
              autoComplete="off"
            />
            <button type="button" onClick={applyCoupon} className="h-11 rounded-md border border-forest px-4 text-sm text-forest hover:bg-cream">
              Aplicar
            </button>
          </div>
          {couponError && (
            <p id="cupom-erro" role="alert" className="mt-2 text-sm text-stock-out">
              {couponError}
            </p>
          )}
        </div>

        <Link
          href={validation?.canCheckout ? "/checkout" : "#"}
          aria-disabled={!validation?.canCheckout}
          onClick={(event) => {
            if (!validation?.canCheckout) event.preventDefault();
          }}
          className={`flex h-12 items-center justify-center rounded-md bg-forest text-sm font-medium text-cream ${
            validation?.canCheckout ? "hover:bg-forest-700" : "pointer-events-none opacity-50"
          }`}
        >
          Ir para o checkout
        </Link>
        {!validation?.canCheckout && (
          <p className="text-xs text-muted">Resolva os avisos acima para continuar.</p>
        )}

        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block text-center text-sm text-forest underline underline-offset-4">
          Dúvidas? Fale pelo WhatsApp
        </a>
      </aside>
    </div>
  );
}

function Row({ label, value, loading = false, strong = false }: { label: string; value: string; loading?: boolean; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "text-base font-semibold text-charcoal" : "text-muted"}`}>
      <span>{label}</span>
      <span aria-busy={loading}>{loading ? "…" : value}</span>
    </div>
  );
}
