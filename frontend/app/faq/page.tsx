import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { faqGroups } from "@/lib/content/faq";
import { WHATSAPP_URL } from "@/lib/config";

export const metadata = { title: "Perguntas frequentes" };

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Perguntas frequentes" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Perguntas frequentes</h1>
      <p className="mt-3 text-muted">Tudo o que você precisa saber sobre pedidos, produtos e pagamento.</p>

      <div className="mt-10 space-y-10">
        {faqGroups.map((group) => (
          <section key={group.title} aria-labelledby={`faq-${group.title}`}>
            <h2 id={`faq-${group.title}`} className="font-display text-2xl text-forest">
              {group.title}
            </h2>
            <div className="mt-4">
              <FaqAccordion items={group.items} />
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-cream p-6 text-center">
        <p className="font-display text-xl text-forest">Não encontrou o que procurava?</p>
        <p className="mt-2 text-sm text-brown">Fale com a gente pelo WhatsApp, respondemos rapidinho.</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-forest px-6 text-sm font-medium text-cream hover:bg-forest-700"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
