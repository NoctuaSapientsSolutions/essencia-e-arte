import type { Product } from "@/types/catalog";

// Informações técnicas. Notas olfativas e uso recomendado só existem para essências.
export function ProductInformation({ product }: { product: Product }) {
  const f = product.fragrance;

  return (
    <div className="space-y-10">
      <section aria-labelledby="descricao-titulo">
        <h2 id="descricao-titulo" className="font-display text-2xl text-forest">Sobre o produto</h2>
        <p className="mt-3 leading-relaxed text-charcoal">{product.description}</p>
      </section>

      {f && (
        <section aria-labelledby="aroma-titulo">
          <h2 id="aroma-titulo" className="font-display text-2xl text-forest">Perfil olfativo</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted">Família</dt>
              <dd className="capitalize">{f.family}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Intensidade</dt>
              <dd>{f.intensity} de 5</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Notas de saída</dt>
              <dd>{f.notes.top.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Notas de coração</dt>
              <dd>{f.notes.heart.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Notas de fundo</dt>
              <dd>{f.notes.base.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Aplicações recomendadas</dt>
              <dd>{f.applications.join(", ")}</dd>
            </div>
            {f.recommendedUsage && (
              <div>
                <dt className="text-sm text-muted">Uso recomendado</dt>
                <dd>{f.recommendedUsage}</dd>
              </div>
            )}
          </dl>
        </section>
      )}

      <section aria-labelledby="cuidados-titulo">
        <h2 id="cuidados-titulo" className="font-display text-2xl text-forest">Cuidados e armazenamento</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-charcoal">
          <li>Guarde em local fresco, seco e longe da luz direta do sol.</li>
          <li>Mantenha o frasco bem fechado quando não estiver em uso.</li>
          <li>Mantenha fora do alcance de crianças e animais.</li>
        </ul>
      </section>

      <section aria-labelledby="faq-titulo">
        <h2 id="faq-titulo" className="font-display text-2xl text-forest">Perguntas frequentes</h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          <details className="group py-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-medium text-forest">
              Posso usar esta essência em velas?
              <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm text-muted">
              Depende da aplicação indicada no perfil olfativo. Consulte o uso recomendado antes de produzir.
            </p>
          </details>
          <details className="group py-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-medium text-forest">
              Qual o prazo de entrega?
              <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm text-muted">
              O prazo aparece no checkout, após o cálculo do frete pelo seu CEP.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
