import { ProductGridSkeleton, SkeletonBlock } from "@/components/ui/SkeletonLoader";

export default function Loading() {
  return (
    <div className="space-y-14 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <SkeletonBlock className="h-80 w-full" />
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="mt-3 h-10 w-80 max-w-full" />
        <div className="mt-8">
          <ProductGridSkeleton />
        </div>
      </div>
    </div>
  );
}
