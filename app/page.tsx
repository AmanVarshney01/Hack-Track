import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();

  return (
    <div>
      <h1>Project Dashboard</h1>
      <AuthButton />
    </div>
  );
}
