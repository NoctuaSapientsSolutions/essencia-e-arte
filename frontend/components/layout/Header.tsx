import Link from "next/link";
import type { ReactNode } from "react";
import { CartLink } from "@/components/cart/CartLink";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { ChatIcon, HeartIcon, SearchIcon, UserIcon } from "@/components/ui/icons";
import { WHATSAPP_URL, STORE_NAME } from "@/lib/config";
import { utilityLinks } from "@/lib/navigation";

// Cabeçalho sticky. O contador do carrinho é lido do contexto no componente CartLink.
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:gap-8">
        <MobileNavigation />

        <Link href="/" className="font-display text-2xl text-forest" aria-label={`${STORE_NAME}, página inicial`}>
          {STORE_NAME}
        </Link>

        <div className="hidden flex-1 justify-center lg:flex">
          <DesktopNavigation />
        </div>

        <div className="ml-auto flex items-center gap-1 text-forest">
          <IconLink href={utilityLinks.search} label="Buscar" className="flex lg:hidden">
            <SearchIcon className="h-5 w-5" />
          </IconLink>
          <Link
            href={utilityLinks.search}
            className="hidden h-11 items-center gap-2 rounded-md px-3 text-sm hover:bg-cream lg:flex"
          >
            <SearchIcon className="h-5 w-5" />
            Buscar
          </Link>

          <IconLink href={utilityLinks.account} label="Minha conta" className="hidden sm:flex">
            <UserIcon className="h-5 w-5" />
          </IconLink>
          <IconLink href={utilityLinks.favorites} label="Favoritos" className="hidden sm:flex">
            <HeartIcon className="h-5 w-5" />
          </IconLink>
          <IconLink href={WHATSAPP_URL} label="Falar no WhatsApp" external className="hidden md:flex">
            <ChatIcon className="h-5 w-5" />
          </IconLink>

          <CartLink />
        </div>
      </div>
    </header>
  );
}

type IconLinkProps = {
  href: string;
  label: string;
  className?: string; // classes de display (flex, hidden, responsivas)
  external?: boolean;
  children: ReactNode;
};

function IconLink({ href, label, className = "", external = false, children }: IconLinkProps) {
  const classes = `h-11 w-11 items-center justify-center rounded-md hover:bg-cream ${className || "flex"}`;
  if (external) {
    return (
      <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={label} className={classes}>
      {children}
    </Link>
  );
}
