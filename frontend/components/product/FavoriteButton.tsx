"use client";

import { useEffect, useState } from "react";
import { HeartIcon } from "@/components/ui/icons";
import { FAVORITES_CHANGE_EVENT, readFavorites, writeFavorites } from "@/lib/favorites/favorites";

export function FavoriteButton({ productId, productName }: { productId: string; productName: string }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    // Leitura após a hidratação, para não divergir do HTML do servidor.
    const sync = () => setFavorite(readFavorites().includes(productId));
    sync();
    window.addEventListener(FAVORITES_CHANGE_EVENT, sync);
    return () => window.removeEventListener(FAVORITES_CHANGE_EVENT, sync);
  }, [productId]);

  const toggle = () => {
    const current = readFavorites();
    const next = favorite ? current.filter((id) => id !== productId) : [...current, productId];
    writeFavorites(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={favorite}
      aria-label={favorite ? `Remover ${productName} dos favoritos` : `Adicionar ${productName} aos favoritos`}
      className={`inline-flex h-11 items-center gap-2 rounded-md border px-4 text-sm ${
        favorite ? "border-forest bg-forest text-cream" : "border-border text-forest hover:border-forest"
      }`}
    >
      <HeartIcon className="h-5 w-5" />
      {favorite ? "Nos favoritos" : "Favoritar"}
    </button>
  );
}
