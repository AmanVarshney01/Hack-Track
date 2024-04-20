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
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  if (!user) {
    return redirect("/login");
  }

  const project = await supabase
    .from("projects")
    .select(
      `
  name,
  users (
    name,
    email
  ),
  project_details (
    description,
    start_date,
    end_date,
    status
  ),
  project_members (
    id,
    member_email,
    users (
      name
    ),
    role
  )
  `,
    )
    .eq("id", params.id)
    .single();

  return <UpdateProject id={params.id} data={project.data} />;
}
