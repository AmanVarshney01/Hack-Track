import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const {data, error} = await supabase.from("users").select("*").eq("id", user.id);

  return (
    <div>
      <h1>Project Dashboard</h1>
      <p>Welcome, {JSON.stringify(data)}</p>
    </div>
  );
}
