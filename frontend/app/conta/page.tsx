import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AccountView } from "@/components/account/AccountView";

export const metadata = { title: "Minha conta" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Minha conta" }]} />
      <AccountView />
    </div>
  );
}
