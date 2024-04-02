import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../database.types";
import { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient<Database> | undefined;

export const createClient = () => {
  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return client;
};
