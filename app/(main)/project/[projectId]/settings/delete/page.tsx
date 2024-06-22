import { isProjectOwner } from "@/server/permissions";
import DeleteProject from "./_components/DeleteProject";

export default async function DeletePage({
  params,
}: {
  params: { projectId: number };
}) {
  const isProjectOwnerCheck = await isProjectOwner(params.projectId);

  if (!isProjectOwnerCheck) {
    throw new Error("You are not the owner of this project.");
  }

  return <DeleteProject projectId={params.projectId} />;
}
