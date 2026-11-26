import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = { title: "Envios e devoluções" };

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Envios e devoluções" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Envios e devoluções</h1>

      <div className="mt-10 space-y-10">
        <section aria-labelledby="envios-titulo">
          <h2 id="envios-titulo" className="font-display text-2xl text-forest">Envios</h2>
          <p className="mt-3 leading-relaxed text-charcoal">
            Enviamos para todo o Brasil. O frete é calculado no checkout a partir do seu CEP, com duas opções de
            entrega:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-charcoal">
            <li><strong>Entrega econômica</strong> — chega em até 9 dias úteis.</li>
            <li><strong>Entrega expressa</strong> — chega em até 4 dias úteis.</li>
          </ul>
          <p className="mt-3 text-sm text-muted">
            Frascos e vidrarias saem embalados com proteção extra para chegar inteiros. Pedidos são despachados em
            até 2 dias úteis após a confirmação do pagamento.
          </p>
        </section>

        <section aria-labelledby="trocas-titulo">
          <h2 id="trocas-titulo" className="font-display text-2xl text-forest">Trocas e devoluções</h2>
          <p className="mt-3 leading-relaxed text-charcoal">
            Você tem até 7 dias corridos após o recebimento para solicitar troca ou devolução, desde que o produto
            esteja lacrado, sem uso e na embalagem original — essências abertas não podem ser trocadas por questões
            de segurança sanitária.
          </p>
          <p className="mt-3 leading-relaxed text-charcoal">
            Produtos com defeito de fabricação são trocados sem custo, incluindo o frete de devolução.
          </p>
        </section>

        <section aria-labelledby="como-titulo">
          <h2 id="como-titulo" className="font-display text-2xl text-forest">Como solicitar</h2>
          <p className="mt-3 leading-relaxed text-charcoal">
            Fale com a gente pelo WhatsApp com o número do seu pedido em mãos. Nosso time explica os próximos passos
            e combina a coleta ou o envio do produto.
          </p>
        </section>
      </div>
    </div>
  );
}
