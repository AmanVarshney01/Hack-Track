import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardGridSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <Skeleton className="h-40" />
      <div className=" flex w-full flex-row gap-4">
        <Skeleton className="h-[27rem] w-full" />
        <div className="flex w-96 flex-col gap-4">
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
        </div>
      </div>
    </div>
  );
}
