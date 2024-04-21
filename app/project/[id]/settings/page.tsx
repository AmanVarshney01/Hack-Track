import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateProject from "./UpdateProject";
import DeleteProject from "./delete/DeleteProject";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage({
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

  const project = await supabase
    .from("projects")
    .select(
      `
  name,
  project_details (
    description,
    start_date,
    end_date,
    status
  )
  `,
    )
    .eq("id", params.id)
    .single();

  if (project.error) {
    throw new Error(project.error.message);
  }

  return <UpdateProject id={params.id} data={project.data} />;
}
