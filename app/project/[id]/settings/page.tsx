import UpdateProject from "./_components/UpdateProject";
import { getProjectDetails } from "@/server/queries";

export default async function SettingsPage({
  params,
}: {
  params: { id: number };
}) {
  const projectDetails = await getProjectDetails(params.id);

  if (projectDetails.error) {
    throw new Error(projectDetails.error.message);
  }

  // if (projectDetails.data.created_by !== user.id) {
  //   return (
  //     <EmptyCard message="You are not the owner of this projectDetails. Only the owner can update the projectDetails settings." />
  //   );
  // }

  return <UpdateProject id={params.id} data={projectDetails.data} />;
}
