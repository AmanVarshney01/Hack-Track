import { columns } from "./Columns";
import TasksTable from "./TasksTable";
import { createClient } from "@/utils/supabase/server";

export default async function TasksGrid({ projectID }: { projectID: number }) {
  const supabase = createClient();

  const { data, error } = await supabase
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
    .eq("project_id", projectID);

  const transformedData = data?.map((task) => {
    return {
      ...task,
      created_by: task.created_by?.name!,
    };
  });

  if (error) {
    throw new Error(error.message);
  }

  return <TasksTable data={transformedData!} columns={columns} />;
}
