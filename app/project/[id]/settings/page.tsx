import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateProject from "./UpdateProject";
import DeleteProject from "./DeleteProject";
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

  return (
    <div className="mx-auto max-w-6xl">
      <div className=" py-10">
        <h1 className=" text-2xl font-semibold">Settings</h1>
      </div>
      <Tabs defaultValue="update">
        <TabsList className="gap-4">
          <TabsTrigger value="update">General</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="update">
          <UpdateProject id={params.id} data={project.data} />
        </TabsContent>
        <TabsContent value="team">Team</TabsContent>
        <TabsContent value="delete">
          <DeleteProject id={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
