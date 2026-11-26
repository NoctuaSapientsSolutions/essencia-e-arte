"use client";

import { useEffect, useState, type FormEvent } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonBlock } from "@/components/ui/SkeletonLoader";
import { FormField } from "@/components/checkout/FormField";
import { ShippingOptions } from "@/components/checkout/ShippingOptions";
import { PaymentMethodSelector } from "@/components/checkout/PaymentMethodSelector";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { validateCart, type CartValidation } from "@/lib/api/cart";
import { createMockOrder, type PaymentMethodId } from "@/lib/api/checkout";
import { formatCep, isValidCep, quoteShipping, type ShippingOption } from "@/lib/api/shipping";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/formatters/price";

const UF_OPTIONS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
  "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  uf: "",
};

type OrderSnapshot = { orderId: string; totalCents: number; email: string };

export function CheckoutView() {
  const { items, ready, clear } = useCart();
  const [validation, setValidation] = useState<CartValidation | null>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "shipping", string>>>({});
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[] | null>(null);
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("pix");
  const [submitting, setSubmitting] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(null);

  // Revalida o carrinho como faria o POST /cart/validate, igual à página do carrinho.
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    validateCart(items).then((result) => {
      if (!cancelled) setValidation(result);
    });
    return () => {
      cancelled = true;
    };
  }, [items, ready]);

  if (orderSnapshot) {
    return <OrderConfirmation orderId={orderSnapshot.orderId} totalCents={orderSnapshot.totalCents} email={orderSnapshot.email} />;
  }

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
        description="Adicione essências, frascos ou kits antes de finalizar a compra."
        actionLabel="Ver essências"
        actionHref="/categorias/essencias"
      />
    );
  }

  if (validation && !validation.canCheckout) {
    return (
      <EmptyState
        title="Revise seu carrinho"
        description="Alguns itens têm problemas de estoque. Volte ao carrinho para ajustar antes de continuar."
        actionLabel="Ir para o carrinho"
        actionHref="/carrinho"
      />
    );
  }

  const subtotalCents = validation?.subtotalCents ?? 0;
  const shippingOption = shippingOptions?.find((option) => option.id === selectedShippingId) ?? null;
  const shippingCents = shippingOption?.priceCents ?? 0;
  const pixDiscountCents = paymentMethod === "pix" ? Math.round(subtotalCents * 0.05) : 0;
  const totalCents = subtotalCents - pixDiscountCents + shippingCents;

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleCepChange = (value: string) => {
    const formatted = formatCep(value);
    updateField("cep", formatted);
    setShippingOptions(null);
    setSelectedShippingId(null);
  };

  const handleQuoteShipping = () => {
    if (!isValidCep(form.cep)) {
      setErrors((current) => ({ ...current, cep: "Informe um CEP válido, com 8 dígitos." }));
      return;
    }
    const options = quoteShipping(form.cep);
    setShippingOptions(options);
    setSelectedShippingId(options?.[0]?.id ?? null);
  };

  const validateForm = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState | "shipping", string>> = {};
    if (!form.name.trim()) nextErrors.name = "Informe seu nome completo.";
    if (!/.+@.+\..+/.test(form.email)) nextErrors.email = "Informe um e-mail válido.";
    if (form.phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Informe um telefone com DDD.";
    if (!isValidCep(form.cep)) nextErrors.cep = "Informe um CEP válido, com 8 dígitos.";
    if (!form.street.trim()) nextErrors.street = "Informe a rua.";
    if (!form.number.trim()) nextErrors.number = "Informe o número.";
    if (!form.neighborhood.trim()) nextErrors.neighborhood = "Informe o bairro.";
    if (!form.city.trim()) nextErrors.city = "Informe a cidade.";
    if (!form.uf) nextErrors.uf = "Selecione o estado.";
    if (!shippingOption) nextErrors.shipping = "Calcule o frete e escolha uma opção de envio.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm() || submitting) return;

    setSubmitting(true);
    const order = await createMockOrder();
    setOrderSnapshot({ orderId: order.orderId, totalCents, email: form.email });
    clear();
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <section className="space-y-4 rounded-lg border border-border bg-background p-6 shadow-card">
          <h2 className="font-display text-2xl text-forest">Contato</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="nome"
              label="Nome completo"
              autoComplete="name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              error={errors.name}
              className="sm:col-span-2"
            />
            <FormField
              id="email"
              label="E-mail"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              error={errors.email}
            />
            <FormField
              id="telefone"
              label="Telefone"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              error={errors.phone}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-lg border border-border bg-background p-6 shadow-card">
          <h2 className="font-display text-2xl text-forest">Endereço de entrega</h2>
          <div className="grid gap-4 sm:grid-cols-[200px_1fr] sm:items-end">
            <FormField
              id="cep"
              label="CEP"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="00000-000"
              value={form.cep}
              onChange={(e) => handleCepChange(e.target.value)}
              error={errors.cep}
            />
            <button
              type="button"
              onClick={handleQuoteShipping}
              className="h-11 rounded-md border border-forest px-4 text-sm font-medium text-forest hover:bg-cream"
            >
              Calcular frete
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="rua"
              label="Rua"
              autoComplete="address-line1"
              value={form.street}
              onChange={(e) => updateField("street", e.target.value)}
              error={errors.street}
              className="sm:col-span-2"
            />
            <FormField
              id="numero"
              label="Número"
              value={form.number}
              onChange={(e) => updateField("number", e.target.value)}
              error={errors.number}
            />
            <FormField
              id="complemento"
              label="Complemento (opcional)"
              autoComplete="address-line2"
              value={form.complement}
              onChange={(e) => updateField("complement", e.target.value)}
            />
            <FormField
              id="bairro"
              label="Bairro"
              value={form.neighborhood}
              onChange={(e) => updateField("neighborhood", e.target.value)}
              error={errors.neighborhood}
            />
            <FormField
              id="cidade"
              label="Cidade"
              autoComplete="address-level2"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              error={errors.city}
            />
            <div>
              <label htmlFor="uf" className="text-sm font-medium text-charcoal">Estado</label>
              <select
                id="uf"
                value={form.uf}
                onChange={(e) => updateField("uf", e.target.value)}
                aria-invalid={Boolean(errors.uf)}
                className={`mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm ${errors.uf ? "border-stock-out" : "border-border"}`}
              >
                <option value="">Selecione</option>
                {UF_OPTIONS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
              {errors.uf && <p role="alert" className="mt-1 text-xs text-stock-out">{errors.uf}</p>}
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-lg border border-border bg-background p-6 shadow-card">
          <h2 className="font-display text-2xl text-forest">Forma de envio</h2>
          {shippingOptions ? (
            <ShippingOptions options={shippingOptions} selectedId={selectedShippingId} onSelect={setSelectedShippingId} />
          ) : (
            <p className="text-sm text-muted">Informe o CEP acima e clique em &quot;Calcular frete&quot; para ver as opções de envio.</p>
          )}
          {errors.shipping && <p role="alert" className="text-sm text-stock-out">{errors.shipping}</p>}
        </section>

        <section className="space-y-4 rounded-lg border border-border bg-background p-6 shadow-card">
          <h2 className="font-display text-2xl text-forest">Forma de pagamento</h2>
          <PaymentMethodSelector selectedId={paymentMethod} onSelect={setPaymentMethod} />
        </section>
      </div>

      <aside aria-labelledby="resumo-titulo" className="h-fit space-y-6 rounded-lg border border-border bg-background p-6 shadow-card">
        <h2 id="resumo-titulo" className="font-display text-2xl text-forest">Resumo do pedido</h2>

        <ul className="space-y-3 border-b border-border pb-4 text-sm">
          {(validation?.lines ?? []).map((line) => (
            <li key={line.variant.id} className="flex justify-between gap-4">
              <span className="text-charcoal">
                {line.product.name} <span className="text-muted">× {line.item.quantity}</span>
              </span>
              <span className="font-medium">{formatPrice(line.lineTotalCents)}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-2 text-sm">
          <Row label="Subtotal" value={formatPrice(subtotalCents)} />
          {pixDiscountCents > 0 && <Row label="Desconto Pix" value={`− ${formatPrice(pixDiscountCents)}`} />}
          <Row label="Frete" value={shippingOption ? formatPrice(shippingCents) : "A calcular"} />
        </div>

        <div className="border-t border-border pt-4">
          <Row label="Total" value={formatPrice(totalCents)} strong />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex h-12 w-full items-center justify-center rounded-md bg-forest text-sm font-medium text-cream hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Finalizando pedido…" : "Finalizar pedido"}
        </button>
      </aside>
    </form>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "text-base font-semibold text-charcoal" : "text-muted"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
