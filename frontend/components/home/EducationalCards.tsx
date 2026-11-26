import Link from "next/link";
import { guides } from "@/lib/content/guides";

export function EducationalCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <li key={guide.slug}>
          <Link
            href={`/guias/${guide.slug}`}
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
