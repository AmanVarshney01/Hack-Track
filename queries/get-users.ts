import { TypedSupabaseClient } from "@/utils/types";

export function getUsers(supabase: TypedSupabaseClient) {
  return supabase.from("users").select("id, name, email").throwOnError();
}
