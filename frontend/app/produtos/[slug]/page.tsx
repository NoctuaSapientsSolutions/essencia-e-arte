import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInformation } from "@/components/product/ProductInformation";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCategories, getProductBySlug, getProducts, getStockForProduct } from "@/lib/api/catalog";
import { summarizeProductStock } from "@/lib/utils/stock";
import type { Product, StockStatus } from "@/types/catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// A página só delega para um componente com Suspense: o acesso a `params` fica dentro da fronteira.
export default function ProductPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProductPageFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

function ProductPageFallback() {
  return (
    <div aria-busy="true" className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-lg bg-cream" />
        <div className="space-y-4">
          <div className="h-10 w-2/3 animate-pulse rounded-md bg-cream" />
          <div className="h-5 w-1/2 animate-pulse rounded-md bg-cream" />
        </div>
      </div>
    </div>
  );
}

async function ProductContent({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [categories, stock, allProducts] = await Promise.all([
    getCategories(),
    getStockForProduct(product.id),
    getProducts(),
  ]);

  const category = categories.find((c) => c.slug === product.categorySlug);

  // Complete a produção: produtos de outras categorias, pensados para quem está criando.
  const crossSell = allProducts
    .filter((p) => p.id !== product.id && p.kind === "raw" && p.categorySlug !== product.categorySlug)
    .slice(0, 4);
  const related = allProducts.filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug).slice(0, 4);

  const stockFor = async (p: Product): Promise<StockStatus> =>
    summarizeProductStock(p, await getStockForProduct(p.id));
  const crossStatus = await Promise.all(crossSell.map(stockFor));
  const relatedStatus = await Promise.all(related.map(stockFor));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          ...(category ? [{ label: category.name, href: `/categorias/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />

        <div>
          <p className="text-sm uppercase tracking-widest text-gold-700">
            {product.kind === "raw" ? "Matéria-prima" : product.kind === "kit" ? "Kit" : "Produto pronto"}
          </p>
          <h1 className="mt-2 text-4xl text-forest sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-brown">{product.shortDescription}</p>

          <div className="mt-8">
            <ProductPurchase product={product} stock={stock} />
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-3xl">
        <ProductInformation product={product} />
      </div>

      {crossSell.length > 0 && (
        <section aria-labelledby="complete-titulo" className="mt-20">
          <h2 id="complete-titulo" className="font-display text-3xl text-forest">Complete sua produção</h2>
          <p className="mt-2 text-muted">Outros itens que combinam com {product.name}.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {crossSell.map((p, index) => (
              <ProductCard key={p.id} product={p} stockStatus={crossStatus[index]} />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="relacionados-titulo" className="mt-20">
          <h2 id="relacionados-titulo" className="font-display text-3xl text-forest">Outras essências</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {related.map((p, index) => (
              <ProductCard key={p.id} product={p} stockStatus={relatedStatus[index]} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
