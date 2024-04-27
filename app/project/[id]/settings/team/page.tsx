import UpdateTeam from "./_components/UpdateTeam";
import InsertTeam from "./_components/InsertTeam";
// import EmptyCard from "@/components/EmptyCard";
import { getProjectMembers } from "@/server/queries";

export default async function TeamPage({ params }: { params: { id: number } }) {
  const projectMembers = await getProjectMembers(params.id);

  if (projectMembers.error) {
    throw new Error(projectMembers.error.message);
  }

  // const projectOwnerId = await supabase
  //   .from("projects")
  //   .select("created_by")
  //   .eq("id", params.id)
  //   .single();

  // if (projectOwnerId.error) {
  //   throw new Error(projectOwnerId.error.message);
  // }

  // if (projectOwnerId.data.created_by !== user.id) {
  //   return (
  //     <EmptyCard message="You are not the owner of this project. Only the owner can update the project settings." />
  //   );
  // }

  return (
    <div className=" flex flex-col gap-4">
      {projectMembers.data.length > 0 && (
        <UpdateTeam projectId={params.id} members={projectMembers.data} />
      )}
      <InsertTeam projectId={params.id} />
    </div>
  );
}
