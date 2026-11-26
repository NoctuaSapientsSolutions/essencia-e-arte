// Tipos do catálogo. Espelham o contrato da API REST (GET /products, /categories, etc.).
// Valores monetários ficam sempre em centavos (inteiros) para evitar erros de arredondamento.

export type ProductKind = "raw" | "finished" | "kit";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  kind: ProductKind;
}

export interface ProductImage {
  src: string; // caminho em public/ ou URL do R2
  alt: string;
  width: number;
  height: number;
}

export interface Variant {
  id: string;
  sku: string;
  label: string; // ex.: "100 ml · Vidro âmbar"
  attributes: Record<string, string>; // ex.: { tamanho: "100 ml", cor: "âmbar" }
  priceCents: number;
}

export interface Stock {
  variantId: string;
  quantity: number;
  status: StockStatus;
}

export interface FragranceProfile {
  family: "floral" | "cítrica" | "amadeirada" | "frutal" | "doce" | "herbal" | "fresca";
  notes: { top: string[]; heart: string[]; base: string[] };
  intensity: 1 | 2 | 3 | 4 | 5;
  applications: Array<"vela" | "difusor" | "spray de ambiente" | "perfume" | "spray para tecidos">;
  recommendedUsage?: string; // ex.: "5% a 10% na base"
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  kind: ProductKind;
  categorySlug: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  variants: Variant[];
  badges: Array<"novidade" | "mais vendido" | "para começar">;
  fragrance?: FragranceProfile; // só para essências
  createdAt: string; // ISO 8601
  rating?: { average: number; count: number };
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}
