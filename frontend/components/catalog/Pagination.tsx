import Link from "next/link";
import { buildQuery, type CatalogFilters } from "@/lib/catalog/filters";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  filters: CatalogFilters;
};

export function Pagination({ page, totalPages, basePath, filters }: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (target: number) =>
    `${basePath}${buildQuery({
      familia: filters.familia,
      aplicacao: filters.aplicacao,
      preco: filters.preco !== "todas" ? filters.preco : undefined,
      disponiveis: filters.somenteDisponiveis ? "1" : undefined,
      ordem: filters.ordem !== "relevancia" ? filters.ordem : undefined,
      pagina: target > 1 ? target : undefined,
    })}`;

  return (
    <nav aria-label="Paginação" className="mt-10 flex items-center justify-center gap-4 text-sm">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="inline-flex h-11 items-center rounded-md border border-border px-4 hover:border-forest">
          Anterior
        </Link>
      ) : (
        <span className="inline-flex h-11 items-center px-4 text-muted">Anterior</span>
      )}
      <span className="text-muted" aria-current="page">
        Página {page} de {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className="inline-flex h-11 items-center rounded-md border border-border px-4 hover:border-forest">
          Próxima
        </Link>
      ) : (
        <span className="inline-flex h-11 items-center px-4 text-muted">Próxima</span>
      )}
    </nav>
  );
}
