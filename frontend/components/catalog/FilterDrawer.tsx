"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { CloseIcon } from "@/components/ui/icons";

// Drawer de filtros no mobile. O conteúdo (formulário GET) vem do servidor,
// então os filtros continuam funcionando mesmo antes do JavaScript carregar.
export function FilterDrawer({ children, resultCount }: { children: ReactNode; resultCount: number }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
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
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-md border border-forest px-4 text-sm font-medium text-forest"
      >
        Filtros
        <span className="rounded-pill bg-forest px-2 text-xs text-cream">{resultCount}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <button type="button" aria-label="Fechar filtros" onClick={() => setOpen(false)} className="flex-1 bg-charcoal/50" />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex h-full w-[min(88vw,380px)] flex-col bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 id={titleId} className="font-display text-xl text-forest">
                Filtros
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-cream"
              >
                <span className="sr-only">Fechar</span>
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </aside>
        </div>
      )}
    </div>
  );
}
