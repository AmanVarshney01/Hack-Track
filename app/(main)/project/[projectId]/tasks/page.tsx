import AddTaskButton from "./_components/AddTaskButton";
import TasksGrid from "./_components/TasksGrid";
import { Suspense } from "react";
import TasksGridSkeleton from "@/components/skeletons/TasksGridSkeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TasksPage({
  params,
}: {
  params: { projectId: number };
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 p-2">
      <Card className=" border-0 bg-background shadow-none">
        <CardHeader className=" flex flex-row items-center justify-between ">
          <CardTitle className=" text-2xl font-semibold">Tasks</CardTitle>
          <AddTaskButton projectId={params.projectId} />
        </CardHeader>
      </Card>
      <Suspense fallback={<TasksGridSkeleton />}>
        <TasksGrid projectId={params.projectId} />
      </Suspense>
    </div>
  );
}
