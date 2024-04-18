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
    <div className=" mx-auto flex h-full w-full max-w-7xl items-center justify-center">
      <CreateProject />
    </div>
  );
}
