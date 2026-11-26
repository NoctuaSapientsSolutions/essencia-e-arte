import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ChatIcon } from "@/components/ui/icons";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/config";

export const metadata = { title: "Contato" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Contato" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Fale com a gente</h1>
      <p className="mt-3 max-w-xl text-muted">
        Dúvidas sobre produtos, pedidos ou parcerias? Escolha o canal que preferir.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ContactForm />

        <aside className="h-fit space-y-4 rounded-lg border border-border bg-cream p-6">
          <div className="flex items-start gap-3">
            <ChatIcon className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
            <div>
              <p className="font-medium text-forest">Atendimento rápido</p>
              <p className="text-sm text-brown">Resposta em minutos, em horário comercial.</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-forest underline underline-offset-4">
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <p className="font-medium text-forest">Instagram</p>
            <p className="text-sm text-brown">Acompanhe lançamentos e inspirações de uso.</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-forest underline underline-offset-4">
              @essenciaearte
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
