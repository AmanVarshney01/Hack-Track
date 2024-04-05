import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CreateProject from "./CreateProject";

export default async function NewProject() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className=" flex h-full items-center justify-center">
      <CreateProject />
    </div>
  );
}
