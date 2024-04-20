import DeleteProject from "./DeleteProject";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DeletePage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    throw new Error(user.error.message);
  }

  if (!user.data.user) {
    return redirect("/login");
  }
  return <DeleteProject id={params.id} />;
}
