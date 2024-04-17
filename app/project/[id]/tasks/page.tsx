import { Tasks, columns } from "./Columns";
import { TasksTable } from "./TasksTable";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddTaskButton from "./AddTaskButton";

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

  if (error) {
    console.error(error);
  }

  if (!user) {
    return redirect("/login");
  }

  const tasks = await supabase
    .from("project_tasks")
    .select(
      `
    id,
    title,
    created_by:users(name),
    priority,
    status    
    `,
    )
    .eq("project_id", params.id);

  const transformedData = tasks.data?.map((task) => {
    return {
      ...task,
      created_by: task.created_by?.name!,
    };
  });

  if (tasks.error) {
    console.error(tasks.error);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-row items-center justify-between py-10">
        <h1 className=" text-2xl font-semibold">Tasks</h1>
        {/* <Button>Add Task</Button> */}
        <AddTaskButton id={params.id} />
      </div>
      <TasksTable data={transformedData!} columns={columns} />
    </div>
  );
}
