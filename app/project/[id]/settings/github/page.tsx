import { redirect } from "next/navigation";
import GithubForm from "./GithubForm";
import { createClient } from "@/utils/supabase/server";
import EmptyCard from "@/components/EmptyCard";
import { getGithubURL } from "@/server/queries";

export default async function GithubPage({
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

  const githubUrl = await getGithubURL(params.id);

  if (githubUrl.error) {
    throw new Error(githubUrl.error.message);
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

  return <GithubForm id={params.id} url={githubUrl.data.github_url ?? ""} />;
}
