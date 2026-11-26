import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WHATSAPP_URL } from "@/lib/config";

export const metadata = { title: "Minha conta" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Minha conta" }]} />

      <div className="mx-auto mt-10 max-w-md py-10 text-center">
        <p className="font-display text-3xl text-forest">Login em breve</p>
        <p className="mt-3 text-sm text-muted">
          Esta é uma versão de protótipo da loja: criar conta, acompanhar pedidos e salvar endereços chegam junto com a
          API da Essência &amp; Arte. Por enquanto, seus favoritos ficam salvos neste navegador.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/favoritos"
            className="inline-flex h-11 items-center justify-center rounded-md bg-forest px-6 text-sm font-medium text-cream hover:bg-forest-700"
          >
            Ver meus favoritos
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md border border-forest px-6 text-sm font-medium text-forest hover:bg-cream"
          >
            Falar com atendimento
          </a>
        </div>
      </div>
    </div>
  );
}
