import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = { title: "Termos de uso" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Termos de uso" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Termos de uso</h1>

      <p className="mt-6 rounded-md bg-cream p-4 text-sm text-brown">
        Este é um protótipo de frontend. O texto abaixo é um modelo de referência e deve ser revisado por um
        profissional jurídico antes de entrar no ar.
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-charcoal">
        <section>
          <h2 className="font-display text-xl text-forest">Sobre a loja</h2>
          <p className="mt-2">
            A Essência &amp; Arte é uma loja online de essências, vidrarias, matérias-primas e produtos aromáticos
            prontos. Ao comprar em nossa loja, você concorda com os termos descritos nesta página.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-forest">Pedidos e preços</h2>
          <p className="mt-2">
            Preços e disponibilidade podem mudar sem aviso prévio. O preço válido é sempre o exibido no momento da
            finalização do pedido. Nos reservamos o direito de cancelar pedidos com erro evidente de preço ou
            estoque.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-forest">Uso dos produtos</h2>
          <p className="mt-2">
            Matérias-primas como essências e bases destinam-se à produção artesanal de itens aromáticos. Siga
            sempre o uso recomendado indicado na ficha de cada produto e mantenha-os fora do alcance de crianças e
            animais.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-forest">Propriedade intelectual</h2>
          <p className="mt-2">
            Textos, imagens e identidade visual deste site pertencem à Essência &amp; Arte e não podem ser
            reproduzidos sem autorização.
          </p>
        </section>
      </div>
    </div>
  );
}
