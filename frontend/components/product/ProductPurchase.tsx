"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FavoriteButton } from "@/components/product/FavoriteButton";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { StockBadge } from "@/components/product/StockBadge";
import { VariantSelector } from "@/components/product/VariantSelector";
import { useCart } from "@/lib/cart/CartContext";
import { WHATSAPP_URL } from "@/lib/config";
import { formatPrice } from "@/lib/formatters/price";
import { utilityLinks } from "@/lib/navigation";
import type { Product, Stock, StockStatus } from "@/types/catalog";

type ProductPurchaseProps = {
  product: Product;
  stock: Stock[];
};

export function ProductPurchase({ product, stock }: ProductPurchaseProps) {
  const { addItem } = useCart();

  // Variante inicial: a primeira que estiver disponível; senão, a primeira da lista.
  const stockOf = (variantId: string) => stock.find((s) => s.variantId === variantId);
  const firstAvailable = product.variants.find((v) => {
    const status = stockOf(v.id)?.status;
    return status === "in_stock" || status === "low_stock";
  });
  const [variantId, setVariantId] = useState((firstAvailable ?? product.variants[0]).id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const entry = stockOf(variant.id);
  const available = entry?.quantity ?? 0;
  const status: StockStatus = entry?.status ?? "out_of_stock";
  const canBuy = status !== "out_of_stock" && available > 0;

  // Estado de cada variante, para o seletor desabilitar as indisponíveis.
  const variantOptions = useMemo(
    () =>
      product.variants.map((v) => ({
        id: v.id,
        label: v.label,
        priceCents: v.priceCents,
        disabled: (stockOf(v.id)?.status ?? "out_of_stock") === "out_of_stock",
      })),
    // stockOf depende de `stock`, que é estável por produto
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product.variants, stock],
  );

  const handleAdd = () => {
    addItem({ productId: product.id, variantId: variant.id, quantity: Math.min(quantity, available) });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <PriceDisplay priceCents={variant.priceCents} showInstallments />
        <StockBadge status={status} />
        {status === "low_stock" && (
          <p className="text-sm text-stock-low">Restam apenas {available} unidades desta opção.</p>
        )}
      </div>

      <VariantSelector
        legend="Tamanho e opção"
        options={variantOptions}
        selectedId={variant.id}
        onSelect={(id) => {
          setVariantId(id);
          setQuantity(1);
        }}
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-charcoal">Quantidade</p>
        <QuantitySelector value={quantity} max={Math.max(1, available)} onChange={setQuantity} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canBuy}
          className="h-12 flex-1 rounded-md bg-forest px-6 text-sm font-medium text-cream hover:bg-forest-700 disabled:cursor-not-allowed disabled:bg-muted"
        >
          {!canBuy ? "Indisponível" : added ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
        </button>
        <Link
          href={canBuy ? utilityLinks.cart : "#"}
          aria-disabled={!canBuy}
          onClick={(event) => {
            if (!canBuy) event.preventDefault();
            else handleAdd();
          }}
          className={`inline-flex h-12 flex-1 items-center justify-center rounded-md border border-forest px-6 text-sm font-medium text-forest ${
            canBuy ? "hover:bg-cream" : "pointer-events-none opacity-50"
          }`}
        >
          Comprar agora
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <FavoriteButton productId={product.id} productName={product.name} />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-md px-4 text-sm text-forest underline underline-offset-4"
        >
          Tirar uma dúvida pelo WhatsApp
        </a>
      </div>

      <div className="rounded-md bg-cream p-4 text-sm text-brown">
        <p className="font-medium text-forest">Frete</p>
        <p className="mt-1">
          O valor do frete é calculado no checkout, com base no seu CEP. Subtotal atual: {formatPrice(variant.priceCents * quantity)}.
        </p>
      </div>
    </div>
  );
}
