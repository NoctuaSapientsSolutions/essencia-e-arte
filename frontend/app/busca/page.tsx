import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchIcon } from "@/components/ui/icons";
import { getProducts, getStockForProduct } from "@/lib/api/catalog";
import { mainNavigation } from "@/lib/navigation";
import { paginate, searchProducts } from "@/lib/catalog/search";
import { summarizeProductStock } from "@/lib/utils/stock";
import type { StockStatus } from "@/types/catalog";

export const metadata = { title: "Busca" };

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = (first(params.q) ?? "").trim();
  const page = Math.max(1, Number.parseInt(first(params.pagina) ?? "1", 10) || 1);

  const products = await getProducts();
  const matched = searchProducts(products, query);
  const result = paginate(matched, page);

  const stockLists = await Promise.all(result.items.map((p) => getStockForProduct(p.id)));
  const stockByProductId: Record<string, StockStatus> = {};
  result.items.forEach((product, index) => {
    stockByProductId[product.id] = summarizeProductStock(product, stockLists[index]);
  });

  const hrefFor = (target: number) => {
    const qs = new URLSearchParams();
    if (query) qs.set("q", query);
    if (target > 1) qs.set("pagina", String(target));
    const value = qs.toString();
    return value ? `/busca?${value}` : "/busca";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Busca" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Buscar produtos</h1>

      <form method="get" action="/busca" className="mt-6 flex max-w-xl gap-2">
        <label htmlFor="q" className="sr-only">Buscar produtos</label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Busque por essência, frasco, vela..."
          autoFocus
          className="h-12 flex-1 rounded-md border border-border bg-background px-4 text-sm"
        />
        <button
          type="submit"
          className="flex h-12 items-center gap-2 rounded-md bg-forest px-5 text-sm font-medium text-cream hover:bg-forest-700"
        >
          <SearchIcon className="h-5 w-5" />
          Buscar
        </button>
      </form>

      <div className="mt-8">
        {!query && (
          <div className="max-w-xl">
            <p className="text-muted">Digite o que você procura, ou explore por categoria:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex h-10 items-center rounded-pill border border-border px-4 text-sm text-forest hover:border-forest"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {query && result.total === 0 && (
          <EmptyState
            title={`Nenhum resultado para "${query}"`}
            description="Confira a grafia ou explore nossas categorias para encontrar o que precisa."
            actionLabel="Ver essências"
            actionHref="/categorias/essencias"
          />
        )}

        {query && result.total > 0 && (
          <>
            <p className="mb-6 border-b border-border pb-4 text-sm text-muted" aria-live="polite">
              {result.total} {result.total === 1 ? "resultado" : "resultados"} para &quot;{query}&quot;
            </p>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {result.items.map((product) => (
                <ProductCard key={product.id} product={product} stockStatus={stockByProductId[product.id]} />
              ))}
            </div>

            {result.totalPages > 1 && (
              <nav aria-label="Paginação" className="mt-10 flex items-center justify-center gap-4 text-sm">
                {result.page > 1 ? (
                  <Link href={hrefFor(result.page - 1)} className="inline-flex h-11 items-center rounded-md border border-border px-4 hover:border-forest">
                    Anterior
                  </Link>
                ) : (
                  <span className="inline-flex h-11 items-center px-4 text-muted">Anterior</span>
                )}
                <span className="text-muted" aria-current="page">
                  Página {result.page} de {result.totalPages}
                </span>
                {result.page < result.totalPages ? (
                  <Link href={hrefFor(result.page + 1)} className="inline-flex h-11 items-center rounded-md border border-border px-4 hover:border-forest">
                    Próxima
                  </Link>
                ) : (
                  <span className="inline-flex h-11 items-center px-4 text-muted">Próxima</span>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
