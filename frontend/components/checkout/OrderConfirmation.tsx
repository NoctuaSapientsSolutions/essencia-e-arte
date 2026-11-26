import Link from "next/link";
import { formatPrice } from "@/lib/formatters/price";
import { WHATSAPP_URL } from "@/lib/config";

type OrderConfirmationProps = {
  orderId: string;
  totalCents: number;
  email: string;
};

export function OrderConfirmation({ orderId, totalCents, email }: OrderConfirmationProps) {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="font-display text-3xl text-forest">Pedido confirmado!</p>
      <p className="mt-3 text-sm text-muted">
        Enviamos os detalhes para <strong className="text-charcoal">{email}</strong>. Você vai receber uma
        atualização assim que o pedido sair para entrega.
      </p>

      <div className="mt-8 space-y-2 rounded-lg border border-border bg-cream p-6 text-left text-sm">
        <Row label="Número do pedido" value={orderId} />
        <Row label="Total pago" value={formatPrice(totalCents)} />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-forest px-6 text-sm font-medium text-cream hover:bg-forest-700"
        >
          Voltar para a loja
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-md border border-forest px-6 text-sm font-medium text-forest hover:bg-cream"
        >
          Dúvidas? Fale pelo WhatsApp
        </a>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-charcoal">{value}</span>
    </div>
  );
}
