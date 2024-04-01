import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const { data } = await supabase.from("users").select("email, name");
  console.log("data", data);
  
  return (
    <div>
      <h1>Project Dashboard</h1>
      <p>Users:</p>
      <ul>
        {data?.map((user) => (
          <li key={user.email}>
            {user.email}
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
