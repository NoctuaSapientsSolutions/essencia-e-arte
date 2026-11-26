import Link from "next/link";
import { INSTAGRAM_URL, STORE_NAME, WHATSAPP_URL } from "@/lib/config";
import { mainNavigation } from "@/lib/navigation";

const support = [
  { label: "Perguntas frequentes", href: "/faq" },
  { label: "Envios e devoluções", href: "/envios" },
  { label: "Formas de pagamento", href: "/pagamento" },
  { label: "Contato", href: "/contato" },
];

const legal = [
  { label: "Política de privacidade", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-forest text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl">{STORE_NAME}</p>
          <p className="mt-3 text-sm text-cream/80">
            Essências, vidrarias, matérias-primas e produtos aromáticos para criar, empreender e transformar ambientes.
          </p>
          <div className="mt-5 flex gap-4 text-sm">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Instagram
            </a>
          </div>
        </div>

        <FooterList title="Categorias" items={mainNavigation} />
        <FooterList title="Atendimento" items={support} />

        <div>
          <form aria-labelledby="newsletter-title" className="space-y-3">
            <h2 id="newsletter-title" className="font-display text-xl">
              Novidades por e-mail
            </h2>
            <label htmlFor="newsletter-email" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Seu e-mail"
              autoComplete="email"
              className="h-11 w-full rounded-md border border-cream/40 bg-transparent px-3 text-sm placeholder:text-cream/60"
            />
            <button type="submit" className="h-11 w-full rounded-md bg-cream text-sm font-medium text-forest hover:bg-white">
              Quero receber
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-cream/80 sm:flex-row sm:justify-between">
          <p>© {STORE_NAME}. Todos os direitos reservados.</p>
          <ul className="flex gap-4">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: Array<{ label: string; href: string }> }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-xl">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-cream/90">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
