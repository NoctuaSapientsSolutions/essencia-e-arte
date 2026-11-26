import Link from "next/link";
import { mainNavigation } from "@/lib/navigation";

export function DesktopNavigation() {
  return (
    <nav aria-label="Navegação principal" className="hidden lg:block">
      <ul className="flex items-center gap-6 text-sm text-forest">
        {mainNavigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="rounded-sm py-1 transition-colors hover:text-gold-700"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
