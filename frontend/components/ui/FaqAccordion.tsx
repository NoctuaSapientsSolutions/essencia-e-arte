export type FaqEntry = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-forest">
            {item.question}
            <span aria-hidden className="shrink-0 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
