import Image from "next/image";
import type { Product } from "@/types/catalog";

// Galeria. Com uma imagem só, mostra a principal; a estrutura aceita várias imagens depois.
export function ProductGallery({ product }: { product: Product }) {
  const [main] = product.images;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-cream">
        {main && (
          <Image
            src={main.src}
            alt={main.alt}
            width={main.width}
            height={main.height}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
