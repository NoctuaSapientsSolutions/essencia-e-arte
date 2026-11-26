import Image from "next/image";
import Link from "next/link";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { StockBadge } from "@/components/product/StockBadge";
import { lowestPriceCents } from "@/lib/utils/stock";
import type { Product, StockStatus } from "@/types/catalog";

type ProductCardProps = {
  product: Product;
  stockStatus: StockStatus;
};

const badgeLabel: Record<Product["badges"][number], string> = {
  novidade: "Novidade",
  "mais vendido": "Mais vendido",
  "para começar": "Para começar",
};

export function ProductCard({ product, stockStatus }: ProductCardProps) {
  const image = product.images[0];
  const hasMultiplePrices = product.variants.length > 1;
  const badge = product.badges[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background shadow-card">
      <Link href={`/produtos/${product.slug}`} className="relative block aspect-square overflow-hidden bg-cream">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {badge && (
          <span className="absolute left-3 top-3 rounded-pill bg-forest px-2.5 py-1 text-xs text-cream">
            {badgeLabel[badge]}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-xl leading-tight text-forest">
            <Link href={`/produtos/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">{product.shortDescription}</p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <PriceDisplay priceCents={lowestPriceCents(product)} from={hasMultiplePrices} showInstallments />
          <StockBadge status={stockStatus} />
        </div>

        {hasMultiplePrices && (
          <p className="text-xs text-muted">{product.variants.length} opções disponíveis</p>
        )}
      </div>
    </article>
  );
}
