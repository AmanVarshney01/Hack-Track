import { createClient } from "@/utils/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getUsers } from "@/queries/get-users";
import Users from "@/components/users";
import { redirect } from "next/navigation";

export default async function Index() {
  const queryClient = new QueryClient();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  await prefetchQuery(queryClient, getUsers(supabase));

  return (
    <div>
      <h1>Project Dashboard</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Users />
      </HydrationBoundary>
    </div>
  );
}
