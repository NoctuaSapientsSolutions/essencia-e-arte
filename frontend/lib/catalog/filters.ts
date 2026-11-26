import { lowestPriceCents } from "@/lib/utils/stock";
import type { Product, StockStatus } from "@/types/catalog";

export const PAGE_SIZE = 12;

export type SortKey = "relevancia" | "menor-preco" | "maior-preco" | "novidades";
export type PriceRange = "todas" | "ate-30" | "30-80" | "acima-80";

export interface CatalogFilters {
  familia?: string;
  aplicacao?: string;
  preco: PriceRange;
  somenteDisponiveis: boolean;
  ordem: SortKey;
  pagina: number;
}

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/** Aceita os slugs usados nos links da home (ex.: "difusor", "spray-de-ambiente") e os rótulos das aplicações. */
export const applicationAliases: Record<string, string> = {
  difusor: "difusor",
  "spray-de-ambiente": "spray de ambiente",
  perfume: "perfume",
  vela: "vela",
  "spray-para-tecidos": "spray para tecidos",
  sache: "sachê",
};

export const applicationOptions = [
  { value: "difusor", label: "Difusor de varetas" },
  { value: "spray-de-ambiente", label: "Spray de ambiente" },
  { value: "perfume", label: "Perfume" },
  { value: "vela", label: "Vela aromática" },
  { value: "spray-para-tecidos", label: "Spray para tecidos" },
];

export const familyOptions = ["floral", "cítrica", "amadeirada", "frutal", "doce", "herbal", "fresca"];

export const priceOptions: Array<{ value: PriceRange; label: string }> = [
  { value: "todas", label: "Todos os preços" },
  { value: "ate-30", label: "Até R$ 30" },
  { value: "30-80", label: "R$ 30 a R$ 80" },
  { value: "acima-80", label: "Acima de R$ 80" },
];

export const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "relevancia", label: "Relevância" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "novidades", label: "Novidades" },
];

export function parseFilters(params: SearchParams): CatalogFilters {
  const aplicacaoRaw = first(params.aplicacao);
  const preco = (first(params.preco) as PriceRange) ?? "todas";
  const ordem = (first(params.ordem) as SortKey) ?? "relevancia";
  const pagina = Math.max(1, Number.parseInt(first(params.pagina) ?? "1", 10) || 1);

  return {
    familia: first(params.familia) || undefined,
    aplicacao: aplicacaoRaw ? applicationAliases[aplicacaoRaw] ?? aplicacaoRaw : undefined,
    preco: priceOptions.some((o) => o.value === preco) ? preco : "todas",
    somenteDisponiveis: first(params.disponiveis) === "1",
    ordem: sortOptions.some((o) => o.value === ordem) ? ordem : "relevancia",
    pagina,
  };
}

function matchesPrice(priceCents: number, range: PriceRange): boolean {
  switch (range) {
    case "ate-30":
      return priceCents <= 3000;
    case "30-80":
      return priceCents > 3000 && priceCents <= 8000;
    case "acima-80":
      return priceCents > 8000;
    default:
      return true;
  }
}

export interface FilteredCatalog {
  items: Product[];
  total: number;
  totalPages: number;
  page: number;
}

/** Aplica filtros, ordenação e paginação sobre os produtos de uma categoria. */
export function applyCatalogFilters(
  products: Product[],
  filters: CatalogFilters,
  stockByProductId: Record<string, StockStatus>,
): FilteredCatalog {
  let list = products.filter((product) => {
    if (filters.familia && product.fragrance?.family !== filters.familia) return false;
    if (filters.aplicacao && !product.fragrance?.applications.includes(filters.aplicacao as never)) return false;
    if (!matchesPrice(lowestPriceCents(product), filters.preco)) return false;
    if (filters.somenteDisponiveis && stockByProductId[product.id] === "out_of_stock") return false;
    return true;
  });

  list = [...list].sort((a, b) => {
    switch (filters.ordem) {
      case "menor-preco":
        return lowestPriceCents(a) - lowestPriceCents(b);
      case "maior-preco":
        return lowestPriceCents(b) - lowestPriceCents(a);
      case "novidades":
        return b.createdAt.localeCompare(a.createdAt);
      default:
        return (b.rating?.count ?? 0) - (a.rating?.count ?? 0);
    }
  });

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(filters.pagina, totalPages);
  const items = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return { items, total, totalPages, page };
}

/** Monta a query string mantendo os filtros atuais, para links de paginação e chips. */
export function buildQuery(filters: Partial<Record<string, string | number | boolean | undefined>>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === "" || value === false) continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}
