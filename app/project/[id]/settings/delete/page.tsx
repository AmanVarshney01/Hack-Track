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
  return <DeleteProject id={params.id} />;
}
