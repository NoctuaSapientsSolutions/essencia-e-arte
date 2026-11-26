// Placeholder animado para estados de carregamento. Marcado como aria-hidden
// e o contêiner pai anuncia o carregamento com aria-busy.
export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`animate-pulse rounded-md bg-cream ${className}`} />;
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-label="Carregando produtos" className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-lg border border-border p-4">
          <SkeletonBlock className="aspect-square w-full" />
          <SkeletonBlock className="h-5 w-3/4" />
          <SkeletonBlock className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
