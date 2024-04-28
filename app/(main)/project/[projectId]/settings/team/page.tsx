import UpdateTeam from "./_components/UpdateTeam";
import InsertTeam from "./_components/InsertTeam";
import { getProjectMembers } from "@/server/queries";
import { isProjectOwner } from "@/server/permissions";

export default async function TeamPage({
  params,
}: {
  params: { projectId: number };
}) {
  const isProjectOwnerCheck = await isProjectOwner(params.projectId);

  if (!isProjectOwnerCheck) {
    throw new Error("You are not the owner of this project.");
  }

  const projectMembers = await getProjectMembers(params.projectId);

  return (
    <div className=" flex flex-col gap-4">
      {projectMembers.data.length > 0 && (
        <UpdateTeam
          projectId={params.projectId}
          members={projectMembers.data}
        />
      )}
      <InsertTeam projectId={params.projectId} />
    </div>
  );
}
