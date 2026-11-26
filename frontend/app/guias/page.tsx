import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { guides } from "@/lib/content/guides";

export const metadata = { title: "Guias" };

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Guias" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Aprenda, crie e perfume</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Guias práticos para quem está começando a produzir seus próprios itens aromáticos.
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guias/${guide.slug}`}
              className="flex h-full flex-col gap-2 rounded-lg border border-border bg-background p-6 shadow-card hover:border-forest"
            >
              <span className="font-display text-2xl text-forest">{guide.title}</span>
              <span className="text-sm text-muted">{guide.summary}</span>
              <span className="mt-2 text-xs text-brown">{guide.readingMinutes} min de leitura</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
