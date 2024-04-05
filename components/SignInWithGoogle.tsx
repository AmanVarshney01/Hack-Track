"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import googleLogo from "@/public/googleLogo.svg";
import Image from "next/image";

export default function SignInWithGoogle() {
  const router = useRouter();

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      "http://localhost:3000/";
    url = url.includes("http") ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const signInWithGoogle = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL()}/auth/callback`,
        // queryParams: {
        //   access_type: "offline",
        //   prompt: "consent",
        // },
      },
    });

    console.log("error", error);

    if (error) {
      return router.push("/login?message=Could not authenticate user");
    }
  };

  return (
    <Button onClick={signInWithGoogle} className="w-full">
      <Image className="mr-2" src={googleLogo} alt="Google Logo" />
      Sign in with Google
    </Button>
  );
}
