"use client";

import { Button } from "@/components/ui/button";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const router = useRouter();

  const signInWithGoogle = async () => {
    // const origin = headers().get("origin");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      // return router.push("/login?message=Could not authenticate user");
      console.log("error", error);
    }

    // return router.push("/");
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // return router.push("/login");
  };

  return (
    <section className="flex min-h-svh items-center justify-center">
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        <button onClick={signInWithGoogle}>Sign with google</button>
      </div>
    </section>
  );
}
