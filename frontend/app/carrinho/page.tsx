import { CartView } from "@/components/cart/CartView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = { title: "Carrinho" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Carrinho" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Seu carrinho</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
