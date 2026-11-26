import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { paymentMethods } from "@/lib/api/checkout";

export const metadata = { title: "Formas de pagamento" };

export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Formas de pagamento" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Formas de pagamento</h1>
      <p className="mt-3 text-muted">Escolha a opção mais conveniente na hora do checkout.</p>

      <div className="mt-10 space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-start justify-between gap-4 rounded-lg border border-border p-6">
            <div>
              <p className="font-display text-xl text-forest">{method.label}</p>
              <p className="mt-1 text-sm text-muted">{method.description}</p>
            </div>
            {method.discountPercent && (
              <span className="shrink-0 rounded-pill bg-olive/15 px-2.5 py-1 text-xs font-medium text-forest">
                −{method.discountPercent}%
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg bg-cream p-6 text-sm text-brown">
        <p className="font-medium text-forest">Compra segura</p>
        <p className="mt-1">
          Todo pagamento é processado por um parceiro certificado; a Essência &amp; Arte não armazena dados do seu
          cartão.
        </p>
      </div>
    </div>
  );
}
