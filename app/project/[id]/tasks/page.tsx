import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddTaskButton from "./AddTaskButton";
import TasksGrid from "./TasksGrid";
import { Suspense } from "react";
import TasksGridSkeleton from "@/components/skeletons/TasksGridSkeleton";

export default async function TasksPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-row items-center justify-between px-2 py-5 md:px-4 md:py-8">
        <h1 className=" text-2xl font-semibold">Tasks</h1>
        <AddTaskButton id={params.id} />
      </div>
      <Suspense fallback={<TasksGridSkeleton />}>
        <TasksGrid projectId={params.id} />
      </Suspense>
    </div>
  );
}
