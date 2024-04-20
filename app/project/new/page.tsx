import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CreateProject from "./CreateProject";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function NewProject() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    return redirect("/login");
  }

  return (
    <ScrollArea className="h-full w-full p-4">
      <div className=" mx-auto flex h-full w-full max-w-7xl items-center justify-center">
        <CreateProject />
      </div>
    </ScrollArea>
  );
}
