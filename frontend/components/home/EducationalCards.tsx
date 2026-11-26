import Link from "next/link";

const guides = [
  { title: "Como fazer um difusor de varetas", href: "/guias/difusor-de-varetas" },
  { title: "Como escolher uma essência", href: "/guias/escolher-essencia" },
  { title: "Qual concentração utilizar", href: "/guias/concentracao" },
  { title: "Qual frasco escolher", href: "/guias/escolher-frasco" },
  { title: "Materiais essenciais para começar", href: "/guias/materiais-essenciais" },
  { title: "Como calcular a produção", href: "/guias/calcular-producao" },
];

export function EducationalCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <li key={guide.href}>
          <Link
            href={guide.href}
            className="flex h-full items-center justify-between rounded-lg border border-border bg-background p-5 text-forest shadow-card hover:border-forest"
          >
            <span className="font-display text-xl leading-snug">{guide.title}</span>
            <span aria-hidden className="ml-4 text-gold-700">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
