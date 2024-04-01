import { createClient } from "@/utils/supabase/client";

export default async function Index() {
  const supabase = createClient();
  const { data } = await supabase.from("users").select("email, name");

  return (
    <div>
      <h1>Project Dashboard</h1>

      <h2>Users</h2>
      <ul>
        {data?.map((user) => (
          <li key={user.email}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
