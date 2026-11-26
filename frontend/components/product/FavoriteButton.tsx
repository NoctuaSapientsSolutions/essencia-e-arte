"use client";

import { useEffect, useState } from "react";
import { HeartIcon } from "@/components/ui/icons";

const STORAGE_KEY = "ea-favoritos-v1";

function readFavorites(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

// Favoritos guardados no navegador por enquanto. Na API real, viram um recurso da conta.
export function FavoriteButton({ productId, productName }: { productId: string; productName: string }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    // Leitura após a hidratação, para não divergir do HTML do servidor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorite(readFavorites().includes(productId));
  }, [productId]);

  const toggle = () => {
    const current = readFavorites();
    const next = favorite ? current.filter((id) => id !== productId) : [...current, productId];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Sem armazenamento disponível, o estado vale só nesta tela.
    }
    setFavorite(!favorite);
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
