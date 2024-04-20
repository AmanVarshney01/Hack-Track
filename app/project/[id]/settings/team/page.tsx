import { createClient } from "@/utils/supabase/server";
import UpdateTeam from "./UpdateTeam";
import { redirect } from "next/navigation";
import InsertTeam from "./InsertTeam";

export default async function TeamPage({ params }: { params: { id: number } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const projectMembers = await supabase
    .from("project_members")
    .select(
      `
      id,
      member_email,
      role
      `,
    )
    .eq("project_id", params.id);

  if (projectMembers.error) {
    throw new Error(projectMembers.error.message);
  }

  return (
    <div className=" flex flex-col gap-4">
      {projectMembers.data.length > 0 && (
        <UpdateTeam projectId={params.id} members={projectMembers.data} />
      )}
      <InsertTeam projectId={params.id} />
    </div>
  );
}
