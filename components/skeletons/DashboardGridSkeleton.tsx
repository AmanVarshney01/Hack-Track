import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardGridSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <Skeleton className="h-56" />
      <div className=" flex w-full flex-col gap-4 md:flex-row">
        <Skeleton className=" h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
