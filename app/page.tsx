import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const { data } = await supabase.from("users").select("email, name");

  return (
    <div>
      <h1>Project Dashboard</h1>
    </div>
  );
}
