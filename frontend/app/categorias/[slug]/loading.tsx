import { ProductGridSkeleton, SkeletonBlock } from "@/components/ui/SkeletonLoader";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <SkeletonBlock className="h-4 w-48" />
      <SkeletonBlock className="mt-6 h-12 w-72" />
      <SkeletonBlock className="mt-3 h-5 w-96 max-w-full" />
      <div className="mt-8">
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
