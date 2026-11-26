"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { mobileNavigationGroups } from "@/lib/navigation";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Fecha com Escape e bloqueia a rolagem da página enquanto o menu estiver aberto.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-11 w-11 items-center justify-center rounded-md text-forest hover:bg-cream"
      >
        <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open &&
        createPortal(
          <div id={panelId} className="fixed inset-0 z-40 overflow-y-auto bg-background pt-20">
            <nav aria-label="Menu principal" className="px-4 py-6">
              {mobileNavigationGroups.map((group) => (
                <section key={group.title} className="mb-8">
                  <h2 className="mb-3 font-display text-xl text-forest">{group.title}</h2>
                  <ul className="divide-y divide-border border-y border-border">
                    {group.items.map((item) => (
                      <li key={`${group.title}-${item.label}`}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-12 items-center py-3 text-base text-charcoal"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
