import { isProjectOwner } from "@/server/permissions";
import UpdateProject from "./_components/UpdateProject";
import { getProjectDetails } from "@/server/queries";

export default async function SettingsPage({
  params,
}: {
  params: { projectId: number };
}) {
  const isProjectOwnerCheck = await isProjectOwner(params.projectId);

  if (!isProjectOwnerCheck) {
    throw new Error("You are not the owner of this project.");
  }

  const projectDetails = await getProjectDetails(params.projectId);

  return <UpdateProject id={params.projectId} data={projectDetails.data} />;
}
