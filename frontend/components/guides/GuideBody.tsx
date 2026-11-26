import type { GuideBlock } from "@/lib/content/guides";

export function GuideBody({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => (
        <section key={block.heading ?? index}>
          {block.heading && <h2 className="font-display text-2xl text-forest">{block.heading}</h2>}
          {block.paragraphs?.map((paragraph, pIndex) => (
            <p key={pIndex} className={`leading-relaxed text-charcoal ${block.heading || pIndex > 0 ? "mt-3" : ""}`}>
              {paragraph}
            </p>
          ))}
          {block.list && (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-charcoal">
              {block.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
