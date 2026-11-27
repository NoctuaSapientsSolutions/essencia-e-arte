"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonBlock } from "@/components/ui/SkeletonLoader";
import { FAVORITES_CHANGE_EVENT, readFavorites } from "@/lib/favorites/favorites";
import { getProducts, getStockForProduct } from "@/lib/api/catalog";
import { summarizeProductStock } from "@/lib/utils/stock";
import type { Product, StockStatus } from "@/types/catalog";

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "loaded"; products: Product[]; stockByProductId: Record<string, StockStatus> };

export function FavoritesView() {
  const [ready, setReady] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [state, setState] = useState<LoadState>({ status: "loading" });

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

  // Busca os produtos favoritados na API sempre que a lista de IDs mudar.
  useEffect(() => {
    if (!ready) return;

    if (ids.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ status: "loaded", products: [], stockByProductId: {} });
      return;
    }

    let cancelled = false;
    setState({ status: "loading" });

    getProducts()
      .then(async (allProducts) => {
        const favoriteProducts = allProducts.filter((product) => ids.includes(product.id));
        const stockLists = await Promise.all(favoriteProducts.map((product) => getStockForProduct(product.id)));
        if (cancelled) return;

        const stockByProductId: Record<string, StockStatus> = {};
        favoriteProducts.forEach((product, index) => {
          stockByProductId[product.id] = summarizeProductStock(product, stockLists[index]);
        });

        setState({ status: "loaded", products: favoriteProducts, stockByProductId });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [ready, ids]);

  if (!ready || state.status === "loading") {
    return (
      <div aria-busy="true" className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <SkeletonBlock className="h-72 w-full" />
        <SkeletonBlock className="h-72 w-full" />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <EmptyState
        title="Não foi possível carregar seus favoritos"
        description="Tente novamente em instantes. Seus favoritos continuam salvos neste navegador."
        actionLabel="Ver essências"
        actionHref="/categorias/essencias"
      />
    );
  }

  if (state.products.length === 0) {
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
      {state.products.map((product) => (
        <ProductCard key={product.id} product={product} stockStatus={state.stockByProductId[product.id]} />
      ))}
    </div>
  );
}
