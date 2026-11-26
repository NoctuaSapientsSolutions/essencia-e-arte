"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { BagIcon } from "@/components/ui/icons";
import { utilityLinks } from "@/lib/navigation";

// Ícone do carrinho com contador. Mostra zero até o carrinho ser lido do navegador.
export function CartLink() {
  const { count, ready } = useCart();
  const shown = ready ? count : 0;

  return (
    <Link
      href={utilityLinks.cart}
      aria-label={`Carrinho, ${shown} ${shown === 1 ? "item" : "itens"}`}
      className="flex h-11 w-11 items-center justify-center rounded-md text-forest hover:bg-cream"
    >
      <span className="relative">
        <BagIcon className="h-5 w-5" />
        {shown > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest px-1 text-[10px] text-cream">
            {shown}
          </span>
        )}
      </span>
    </Link>
  );
}
