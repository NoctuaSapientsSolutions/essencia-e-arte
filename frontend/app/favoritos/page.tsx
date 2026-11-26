import { FavoritesView } from "@/components/favorites/FavoritesView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = { title: "Favoritos" };

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Favoritos" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Seus favoritos</h1>
      <p className="mt-3 max-w-2xl text-muted">Os produtos que você guardou para comprar depois, salvos neste navegador.</p>
      <div className="mt-8">
        <FavoritesView />
      </div>
    </div>
  );
}
