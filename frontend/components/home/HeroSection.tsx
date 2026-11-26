import Link from "next/link";

// Duas intenções de compra logo no início: quem quer criar e quem quer comprar pronto.
export function HeroSection() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-widest text-gold-700">Essências e matérias-primas</p>
          <h1 className="mt-4 text-4xl leading-[1.1] text-forest sm:text-6xl">
            Onde o aroma se transforma em experiência.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brown">
            Essências, vidrarias, matérias-primas e produtos aromáticos para criar, empreender e transformar ambientes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/categorias/essencias"
              className="inline-flex h-12 items-center justify-center rounded-md bg-forest px-6 text-sm font-medium text-cream hover:bg-forest-700"
            >
              Comprar matérias-primas
            </Link>
            <Link
              href="/categorias/produtos-prontos"
              className="inline-flex h-12 items-center justify-center rounded-md border border-forest px-6 text-sm font-medium text-forest hover:bg-white"
            >
              Conhecer produtos prontos
            </Link>
          </div>
        </div>

        <div
          className="aspect-[4/3] rounded-lg bg-gradient-to-br from-olive/40 via-cream to-gold/30 shadow-floating"
          role="img"
          aria-label="Espaço reservado para a foto principal da home"
        />
      </div>
    </section>
  );
}
