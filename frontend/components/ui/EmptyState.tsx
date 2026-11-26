import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="font-display text-2xl text-forest">{title}</p>
      <p className="mt-3 text-sm text-muted">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-forest px-6 text-sm font-medium text-cream hover:bg-forest-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
