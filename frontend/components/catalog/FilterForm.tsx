import {
  applicationAliases,
  applicationOptions,
  familyOptions,
  priceOptions,
  sortOptions,
  type CatalogFilters,
} from "@/lib/catalog/filters";

type FilterFormProps = {
  filters: CatalogFilters;
  basePath: string;
  idPrefix: string;
};

// Formulário GET: funciona sem JavaScript e deixa os filtros na URL, compartilháveis.
// Ao enviar, a página recarrega, então o drawer mobile fecha sozinho.
export function FilterForm({ filters, basePath, idPrefix }: FilterFormProps) {
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <form method="get" action={basePath} className="space-y-8">
      <fieldset className="space-y-3">
        <legend id={id("ordem-legend")} className="mb-3 font-display text-lg text-forest">Ordenar por</legend>
        <select
          id={id("ordem")}
          name="ordem"
          defaultValue={filters.ordem}
          aria-labelledby={id("ordem-legend")}
          className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="space-y-3">
        <legend id={id("familia-legend")} className="mb-3 font-display text-lg text-forest">Família olfativa</legend>
        <select
          id={id("familia")}
          name="familia"
          defaultValue={filters.familia ?? ""}
          aria-labelledby={id("familia-legend")}
          className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm capitalize"
        >
          <option value="">Todas as famílias</option>
          {familyOptions.map((family) => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="mb-3 font-display text-lg text-forest">Aplicação recomendada</legend>
        <ul className="space-y-2">
          {applicationOptions.map((option) => (
            <li key={option.value}>
              <label className="flex min-h-11 items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="aplicacao"
                  value={option.value}
                  defaultChecked={filters.aplicacao === applicationAliases[option.value]}
                  className="h-4 w-4 accent-forest"
                />
                {option.label}
              </label>
            </li>
          ))}
          <li>
            <label className="flex min-h-11 items-center gap-3 text-sm">
              <input type="radio" name="aplicacao" value="" defaultChecked={!filters.aplicacao} className="h-4 w-4 accent-forest" />
              Qualquer aplicação
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset className="space-y-3">
        <legend id={id("preco-legend")} className="mb-3 font-display text-lg text-forest">Faixa de preço</legend>
        <select
          id={id("preco")}
          name="preco"
          defaultValue={filters.preco}
          aria-labelledby={id("preco-legend")}
          className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
        >
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="disponiveis"
            value="1"
            defaultChecked={filters.somenteDisponiveis}
            className="h-4 w-4 accent-forest"
          />
          Mostrar somente disponíveis
        </label>
      </fieldset>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="h-11 flex-1 rounded-md bg-forest px-4 text-sm font-medium text-cream hover:bg-forest-700">
          Aplicar filtros
        </button>
        <a href={basePath} className="inline-flex h-11 items-center justify-center rounded-md border border-border px-4 text-sm text-forest hover:border-forest">
          Limpar
        </a>
      </div>
    </form>
  );
}
