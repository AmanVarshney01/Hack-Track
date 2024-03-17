import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // const { data, error } = await supabase.from("users").select("email");
  // console.log("� ~ Index ~ data:", data);
  // console.log("� ~ Index ~ error:", error);

  return (
    <div>
      <h1>Project Dashboard</h1>
      
    </div>
  );
}
