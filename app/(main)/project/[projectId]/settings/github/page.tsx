import GithubForm from "./_components/GithubForm";
import { getGithubURL } from "@/server/queries";
import { isProjectOwner } from "@/server/permissions";

export default async function GithubPage({
  params,
}: {
  params: { projectId: number };
}) {
  const isProjectOwnerCheck = await isProjectOwner(params.projectId);

  if (!isProjectOwnerCheck) {
    throw new Error("You are not the owner of this project.");
  }

  const githubUrl = await getGithubURL(params.projectId);

  return <GithubForm id={params.projectId} url={githubUrl.data.github_url!} />;
}
