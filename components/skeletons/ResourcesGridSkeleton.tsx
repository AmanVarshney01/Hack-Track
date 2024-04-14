import { Skeleton } from "@/components/ui/skeleton";

export default function ResourcesGridSkeleton() {
  return (
    <div className=" grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <Skeleton className="h-36" />
      <Skeleton className="h-36" />
      <Skeleton className="h-36" />
    </div>
  );
}
