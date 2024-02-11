// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export default async function Index() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session) {
  //   redirect("/login")
  // }

  return (
    <div>
      <h1>Project Dashboard</h1>
    </div>
  );
}
