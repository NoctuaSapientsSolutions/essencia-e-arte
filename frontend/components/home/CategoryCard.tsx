import Link from "next/link";
import type { Category } from "@/types/catalog";

// Cards de categoria com a distinção visual entre matéria-prima, produto pronto e kit.
const kindLabel: Record<Category["kind"], string> = {
  raw: "Para criar",
  finished: "Pronto para usar",
  kit: "Para começar",
};

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categorias/${category.slug}`}
      className="group flex h-full flex-col justify-between rounded-lg border border-border bg-background p-6 shadow-card transition-colors hover:border-forest"
    >
      <div>
        <p className="text-xs uppercase tracking-widest text-gold-700">{kindLabel[category.kind]}</p>
        <h3 className="mt-2 font-display text-2xl text-forest">{category.name}</h3>
        <p className="mt-2 text-sm text-muted">{category.description}</p>
      </div>
      <span className="mt-6 text-sm font-medium text-forest group-hover:underline">Ver categoria →</span>
    </Link>
  );
}
