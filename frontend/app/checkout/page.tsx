import { CheckoutView } from "@/components/checkout/CheckoutView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Carrinho", href: "/carrinho" }, { label: "Checkout" }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">Finalizar compra</h1>
      <div className="mt-8">
        <CheckoutView />
      </div>
    </div>
  );
}
