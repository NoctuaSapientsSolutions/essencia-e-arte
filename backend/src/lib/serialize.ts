import type { Category, Fragrance, Product, ProductImage, Stock, Variant } from "@prisma/client";
import { fragranceFamilyToApi } from "./fragranceFamily.js";

type ProductWithRelations = Product & {
  category: Category;
  images: ProductImage[];
  variants: (Variant & { stock: Stock | null })[];
  fragrance: Fragrance | null;
};

export function serializeCategory(category: Category) {
  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    description: category.description,
    kind: category.kind,
  };
}

export function serializeProduct(product: ProductWithRelations) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    kind: product.kind,
    categorySlug: product.category.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    images: product.images
      .sort((a, b) => a.position - b.position)
      .map((image) => ({ src: image.src, alt: image.alt, width: image.width, height: image.height })),
    variants: product.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      label: variant.label,
      attributes: variant.attributes as Record<string, string>,
      priceCents: variant.priceCents,
    })),
    badges: product.badges,
    fragrance: product.fragrance
      ? {
          family: fragranceFamilyToApi(product.fragrance.family),
          notes: {
            top: product.fragrance.notesTop,
            heart: product.fragrance.notesHeart,
            base: product.fragrance.notesBase,
          },
          intensity: product.fragrance.intensity,
          applications: product.fragrance.applications,
          recommendedUsage: product.fragrance.recommendedUsage ?? undefined,
        }
      : undefined,
    createdAt: product.createdAt.toISOString(),
    rating:
      product.ratingAverage != null && product.ratingCount != null
        ? { average: product.ratingAverage, count: product.ratingCount }
        : undefined,
  };
}

export function serializeStock(stock: Stock) {
  return { variantId: stock.variantId, quantity: stock.quantity, status: stock.status };
}
