import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../database.types";
import { useMemo } from "react";
import type { TypedSupabaseClient } from "@/utils/types";

let client: TypedSupabaseClient | undefined;

const createSupabaseClient = () => {
  if (client) return client;

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return client;
};

export function createClient() {
  return useMemo(createSupabaseClient, []);
}

