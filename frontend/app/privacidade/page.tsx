import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = { title: "Política de privacidade" };

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Política de privacidade" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Política de privacidade</h1>

      <p className="mt-6 rounded-md bg-cream p-4 text-sm text-brown">
        Este é um protótipo de frontend. O texto abaixo é um modelo de referência e deve ser revisado por um
        profissional jurídico antes de entrar no ar, para garantir conformidade com a LGPD.
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-charcoal">
        <section>
          <h2 className="font-display text-xl text-forest">Quais dados coletamos</h2>
          <p className="mt-2">
            Coletamos os dados que você informa ao fazer um pedido — nome, e-mail, telefone e endereço de entrega —
            além de dados de navegação usados para melhorar sua experiência na loja.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-forest">Como usamos seus dados</h2>
          <p className="mt-2">
            Usamos essas informações para processar pedidos, calcular frete, enviar atualizações sobre sua compra e,
            quando autorizado, enviar novidades por e-mail. Não vendemos seus dados a terceiros.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-forest">Armazenamento local</h2>
          <p className="mt-2">
            Itens do carrinho e favoritos ficam salvos no armazenamento do seu navegador, neste dispositivo, e não
            são enviados aos nossos servidores até a finalização de um pedido.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-forest">Seus direitos</h2>
          <p className="mt-2">
            Você pode solicitar a qualquer momento o acesso, a correção ou a exclusão dos seus dados pessoais,
            entrando em contato pelos canais da nossa página de contato.
          </p>
        </section>
      </div>
    </div>
  );
}
