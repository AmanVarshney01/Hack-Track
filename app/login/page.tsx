"use client";

import { Button } from "@/components/ui/button";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import googleLogo from "@/public/googleLogo.svg";
import Image from "next/image";

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
    <section className="absolute flex min-h-svh w-full items-center justify-center bg-background/80">
      <Button onClick={signInWithGoogle} className="text-lg">
        <Image className="mr-2" src={googleLogo} alt="Google Logo" />
        Sign in with Google
      </Button>
    </section>
  );
}
