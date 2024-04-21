import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddTaskButton from "./AddTaskButton";
import TasksGrid from "./TasksGrid";
import { Suspense } from "react";
import TasksGridSkeleton from "@/components/skeletons/TasksGridSkeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TasksPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <Card className=" border-0 ">
        <CardHeader className=" flex flex-row items-center justify-between ">
          <CardTitle className=" text-2xl font-semibold">Tasks</CardTitle>
          <AddTaskButton id={params.id} />
        </CardHeader>
      </Card>
      <Suspense fallback={<TasksGridSkeleton />}>
        <TasksGrid projectId={params.id} />
      </Suspense>
    </div>
  );
}
