import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsGridSkeleton() {
  return (
    <div className=" grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <Skeleton className="h-52 rounded-xl" />
      <Skeleton className="h-52 rounded-xl" />
      <Skeleton className="h-52 rounded-xl" />
    </div>
  );
}
