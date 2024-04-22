import EmptyCard from "@/components/EmptyCard";
import DeleteProject from "./DeleteProject";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DeletePage({
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

  const projectOwnerId = await supabase
    .from("projects")
    .select("created_by")
    .eq("id", params.id)
    .single();

  if (projectOwnerId.error) {
    throw new Error(projectOwnerId.error.message);
  }

  if (projectOwnerId.data.created_by !== user.id) {
    return (
      <EmptyCard message="You are not the owner of this project. Only the owner can update the project settings." />
    );
  }

  return <DeleteProject id={params.id} />;
}
