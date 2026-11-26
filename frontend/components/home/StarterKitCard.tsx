import Link from "next/link";
import { formatPrice } from "@/lib/formatters/price";
import type { Product } from "@/types/catalog";

// Cards de kit para iniciantes: mostram o que dá para fazer, não só o que vem na caixa.
export function StarterKitCard({ product, yieldText }: { product: Product; yieldText: string }) {
  const price = product.variants[0]?.priceCents ?? 0;

  return (
    <article className="flex h-full flex-col rounded-lg bg-forest p-6 text-cream">
      <h3 className="font-display text-2xl">{product.name}</h3>
      <p className="mt-2 text-sm text-cream/80">{yieldText}</p>
      <p className="mt-auto pt-6 text-lg font-semibold">{formatPrice(price)}</p>
      <Link
        href={`/produtos/${product.slug}`}
        className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-cream text-sm font-medium text-forest hover:bg-white"
      >
        Ver o kit
      </Link>
    </article>
  );
}
