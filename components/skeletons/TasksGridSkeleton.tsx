import { Skeleton } from "@/components/ui/skeleton";

export default function TasksGridSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-52" />
      <Skeleton className="h-60" />
    </div>
  );
}
