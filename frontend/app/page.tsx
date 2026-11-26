import type { ReactNode } from "react";
import { CategoryCard } from "@/components/home/CategoryCard";
import { EducationalCards } from "@/components/home/EducationalCards";
import { HeroSection } from "@/components/home/HeroSection";
import { ShopByProject } from "@/components/home/ShopByProject";
import { SocialProofPlaceholder } from "@/components/home/SocialProofPlaceholder";
import { StarterKitCard } from "@/components/home/StarterKitCard";
import { FeaturedProducts, type FeaturedTab } from "@/components/product/FeaturedProducts";
import { getCategories, getProducts, getStockForProduct } from "@/lib/api/catalog";
import { summarizeProductStock } from "@/lib/utils/stock";
import type { Product, StockStatus } from "@/types/catalog";

export default async function HomePage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  // Estoque resumido por produto, para o badge de cada card.
  const stockLists = await Promise.all(products.map((p) => getStockForProduct(p.id)));
  const stockByProductId: Record<string, StockStatus> = {};
  products.forEach((product, index) => {
    stockByProductId[product.id] = summarizeProductStock(product, stockLists[index]);
  });

  const tabs: FeaturedTab[] = [
    { id: "mais-vendidos", label: "Mais vendidos", products: pick(products, (p) => p.badges.includes("mais vendido")) },
    {
      id: "novidades",
      label: "Novidades",
      products: [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4),
    },
    { id: "para-comecar", label: "Para começar", products: pick(products, (p) => p.badges.includes("para começar")) },
    { id: "produtos-prontos", label: "Produtos prontos", products: pick(products, (p) => p.kind === "finished") },
  ];

  const kits = products.filter((p) => p.kind === "kit");

  return (
    <>
      <HeroSection />

      <Section title="Explore por tipo de produto" eyebrow="Categorias">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Section>

      <Section title="Começando sua primeira criação aromática?" eyebrow="Para iniciantes">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kits.map((kit) => (
            <StarterKitCard key={kit.id} product={kit} yieldText="Monte seu primeiro lote com instruções práticas." />
          ))}
        </div>
      </Section>

      <Section title="Destaques da loja" eyebrow="Produtos">
        <FeaturedProducts tabs={tabs} stockByProductId={stockByProductId} />
      </Section>

      <Section title="O que você deseja criar?" eyebrow="Por projeto">
        <ShopByProject />
      </Section>

      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <p className="font-display text-3xl sm:text-4xl">
            Do primeiro frasco ao aroma final, tudo o que você precisa em um só lugar.
          </p>
        </div>
      </section>

      <Section title="Aprenda, crie e perfume" eyebrow="Guias">
        <EducationalCards />
      </Section>

      <Section title="Quem já criou com a gente" eyebrow="Prova social">
        <SocialProofPlaceholder />
      </Section>
    </>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
      <p className="text-sm uppercase tracking-widest text-gold-700">{eyebrow}</p>
      <h2 className="mb-8 mt-2 text-3xl text-forest sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

function pick(list: Product[], predicate: (p: Product) => boolean): Product[] {
  return list.filter(predicate);
}
