"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonBlock } from "@/components/ui/SkeletonLoader";
import { FAVORITES_CHANGE_EVENT, readFavorites } from "@/lib/favorites/favorites";
import { products, stock } from "@/lib/mocks/catalog";
import { summarizeProductStock } from "@/lib/utils/stock";

export function FavoritesView() {
  const [ready, setReady] = useState(false);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(readFavorites());
    sync();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
    window.addEventListener(FAVORITES_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!ready) {
    return (
      <div aria-busy="true" className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <SkeletonBlock className="h-72 w-full" />
        <SkeletonBlock className="h-72 w-full" />
      </div>
    );
  }

  const favoriteProducts = ids
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  if (favoriteProducts.length === 0) {
    return (
      <EmptyState
        title="Você ainda não tem favoritos"
        description="Toque no coração de um produto para guardá-lo aqui e encontrar rápido na próxima visita."
        actionLabel="Ver essências"
        actionHref="/categorias/essencias"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {favoriteProducts.map((product) => (
        <ProductCard key={product.id} product={product} stockStatus={summarizeProductStock(product, stock)} />
      ))}
    </div>
  );
}
