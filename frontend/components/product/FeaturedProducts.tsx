"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product, StockStatus } from "@/types/catalog";

export type FeaturedTab = {
  id: string;
  label: string;
  products: Product[];
};

type FeaturedProductsProps = {
  tabs: FeaturedTab[];
  stockByProductId: Record<string, StockStatus>;
};

// Abas com navegação por teclado (setas, Home e End), conforme o padrão ARIA de tabs.
export function FeaturedProducts({ tabs, stockByProductId }: FeaturedProductsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const baseId = useId();
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;

    event.preventDefault();
    setActiveId(tabs[next].id);
    document.getElementById(`${baseId}-tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Destaques da loja" className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab, index) => {
          const selected = tab.id === active?.id;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`shrink-0 rounded-pill border px-4 py-2 text-sm transition-colors ${
                selected
                  ? "border-forest bg-forest text-cream"
                  : "border-border text-forest hover:border-forest"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active?.id}`} className="mt-6">
        {active && active.products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {active.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                stockStatus={stockByProductId[product.id] ?? "out_of_stock"}
              />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted">Nenhum produto nesta seleção por enquanto.</p>
        )}
      </div>
    </div>
  );
}
