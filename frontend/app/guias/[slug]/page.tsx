import { notFound } from "next/navigation";
import { GuideBody } from "@/components/guides/GuideBody";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getGuideBySlug, guides } from "@/lib/content/guides";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  return { title: guide?.title ?? "Guia" };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Guias", href: "/guias" }, { label: guide.title }]} />
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">{guide.title}</h1>
      <p className="mt-3 text-muted">{guide.summary}</p>
      <p className="mt-1 text-xs text-brown">{guide.readingMinutes} min de leitura</p>

      <div className="mt-10">
        <GuideBody blocks={guide.blocks} />
      </div>
    </div>
  );
}
