import DashboardGrid from "./_components/DashboardGrid";
import { Suspense } from "react";
import DashboardGridSkeleton from "@/components/skeletons/DashboardGridSkeleton";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: number };
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 p-2">
      <Card className="border-0 bg-background shadow-none">
        <CardHeader>
          <CardTitle className=" text-2xl font-semibold">Dashboard</CardTitle>
        </CardHeader>
      </Card>
      <Suspense fallback={<DashboardGridSkeleton />}>
        <DashboardGrid projectId={params.projectId} />
      </Suspense>
    </div>
  );
}
