import Link from "next/link";

// Atalhos por projeto: o cliente pensa no que quer criar, não na categoria.
const projects = [
  { label: "Difusor de varetas", href: "/categorias/essencias?aplicacao=difusor" },
  { label: "Spray de ambiente", href: "/categorias/essencias?aplicacao=spray-de-ambiente" },
  { label: "Perfume", href: "/categorias/essencias?aplicacao=perfume" },
  { label: "Vela aromática", href: "/categorias/essencias?aplicacao=vela" },
  { label: "Água para tecidos", href: "/categorias/essencias?aplicacao=spray-para-tecidos" },
  { label: "Sachê perfumado", href: "/categorias/essencias?aplicacao=sache" },
  { label: "Lembrancinhas", href: "/categorias/kits-para-comecar" },
];

export function ShopByProject() {
  return (
    <ul className="flex flex-wrap gap-3">
      {projects.map((project) => (
        <li key={project.label}>
          <Link
            href={project.href}
            className="inline-flex h-11 items-center rounded-pill border border-border bg-background px-5 text-sm text-forest transition-colors hover:border-forest hover:bg-cream"
          >
            {project.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
