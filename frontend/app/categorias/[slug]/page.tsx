import { notFound } from "next/navigation";
import { FilterDrawer } from "@/components/catalog/FilterDrawer";
import { FilterForm } from "@/components/catalog/FilterForm";
import { Pagination } from "@/components/catalog/Pagination";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/product/ProductCard";
import { getCategories, getProducts, getStockForProduct } from "@/lib/api/catalog";
import { applyCatalogFilters, parseFilters, sortOptions } from "@/lib/catalog/filters";
import { summarizeProductStock } from "@/lib/utils/stock";
import type { StockStatus } from "@/types/catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const filters = parseFilters(await searchParams);

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await getProducts(category.slug);

  // Estoque resumido por produto, usado no filtro "somente disponíveis" e nos badges.
  const stockLists = await Promise.all(products.map((p) => getStockForProduct(p.id)));
  const stockByProductId: Record<string, StockStatus> = {};
  products.forEach((product, index) => {
    stockByProductId[product.id] = summarizeProductStock(product, stockLists[index]);
  });

  const result = applyCatalogFilters(products, filters, stockByProductId);
  const basePath = `/categorias/${category.slug}`;
  const sortLabel = sortOptions.find((o) => o.value === filters.ordem)?.label ?? "Relevância";

  const filterForm = (idPrefix: string) => (
    <FilterForm filters={filters} basePath={basePath} idPrefix={idPrefix} />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: category.name, href: basePath },
        ]}
      />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl text-forest sm:text-5xl">{category.name}</h1>
        <p className="mt-3 text-muted">{category.description}</p>
      </header>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:gap-10">
        {/* Filtros no desktop */}
        <aside className="hidden w-64 shrink-0 lg:block" aria-label="Filtros">
          <h2 className="mb-6 font-display text-2xl text-forest">Filtrar</h2>
          {filterForm("desktop")}
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <p className="text-sm text-muted" aria-live="polite">
              {result.total} {result.total === 1 ? "produto" : "produtos"} · ordenado por {sortLabel.toLowerCase()}
            </p>
            <FilterDrawer resultCount={result.total}>{filterForm("mobile")}</FilterDrawer>
          </div>

          {result.items.length > 0 ? (
            <>
              <h2 className="sr-only">Produtos da categoria</h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                {result.items.map((product) => (
                  <ProductCard key={product.id} product={product} stockStatus={stockByProductId[product.id]} />
                ))}
              </div>
              <Pagination page={result.page} totalPages={result.totalPages} basePath={basePath} filters={filters} />
            </>
          ) : (
            <EmptyState
              title="Nenhum produto com esses filtros"
              description="Tente remover algum filtro ou ver todos os produtos da categoria."
              actionLabel="Limpar filtros"
              actionHref={basePath}
            />
          )}
        </div>
      </div>
    </div>
  );
}
