import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
// import { useRouter } from "next/navigation";
import googleLogo from "@/public/googleLogo.svg";
import Image from "next/image";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function SignInWithGoogle() {
  // const router = useRouter();

  // const getURL = () => {
  //   let url =
  //     process?.env?.NEXT_PUBLIC_SITE_URL ??
  //     process?.env?.NEXT_PUBLIC_VERCEL_URL ??
  //     "http://localhost:3000/";
  //   url = url.includes("http") ? url : `https://${url}`;
  //   url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  //   return url;
  // };

  const signInWithGoogle = async () => {
    "use server"
    
    const supabase = createClient();
    const origin = headers().get("origin")
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
        // queryParams: {
        //   access_type: "offline",
        //   prompt: "consent",
        // },
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    } 

    return redirect(data.url);    
  };

  return (
    <form action={signInWithGoogle} className="w-full">
      <Button className="w-full" type="submit">
        <Image className="mr-2" src={googleLogo} alt="Google Logo" />
        Sign in with Google
      </Button>
    </form>
  );
}
