"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import googleLogo from "@/public/googleLogo.svg";
import Image from "next/image";

export default function SignInWithGoogle() {
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
      return router.push("/login?message=Could not authenticate user");
    }

    // return router.push("/");
  };

  // const signOut = async () => {
  //   const supabase = createClient();
  //   await supabase.auth.signOut();
  //   return router.push("/login");
  // };

  return (
    <Button onClick={signInWithGoogle} className="w-full">
      <Image className="mr-2" src={googleLogo} alt="Google Logo" />
      Sign in with Google
    </Button>
  );
}
