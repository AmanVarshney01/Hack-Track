import { redirect } from "next/navigation";
import GithubForm from "./GithubForm";
import { createClient } from "@/utils/supabase/server";

export default async function GithubPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return redirect("/login");
  }

  const { data, error } = await supabase
    .from("project_details")
    .select("github_url")
    .eq("project_id", params.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return <GithubForm id={params.id} url={data.github_url ?? ""} />;
}
