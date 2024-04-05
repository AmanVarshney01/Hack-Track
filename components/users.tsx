"use client";

import { createClient } from "@/utils/supabase/client";
import { getUsers } from "@/queries/get-users";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

export default function Users() {
  const supabase = createClient();
  const { data: users } = useQuery(getUsers(supabase));

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
