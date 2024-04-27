import ResourcesGrid from "./_components/ResourcesGrid";
import AddResourceButton from "./_components/AddResourceButton";
import { Suspense } from "react";
import ResourcesGridSkeleton from "@/components/skeletons/ResourcesGridSkeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ResourcesPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 p-4">
      <Card className=" border-0 ">
        <CardHeader className=" flex flex-row items-center justify-between ">
          <CardTitle className=" text-2xl font-semibold">Resources</CardTitle>
          <AddResourceButton id={params.id} />
        </CardHeader>
      </Card>
      <Suspense fallback={<ResourcesGridSkeleton />}>
        <ResourcesGrid projectId={params.id} />
      </Suspense>
    </div>
  );
}
