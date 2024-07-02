import { Button } from "@/components/ui/button";
import githubLogo from "@/public/github-mark.svg";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function SignInWithGithub() {
  const signInWithGithub = async () => {
    "use server";

    const supabase = createClient();
    const origin = headers().get("origin");
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect(data.url);
  };

  return (
    <form action={signInWithGithub} className="w-full">
      <Button className="w-full" type="submit">
        <Image
          className="mr-2 invert dark:invert-0"
          src={githubLogo}
          alt="Github Logo"
          width={20}
          height={20}
        />
        Sign in with Github
      </Button>
    </form>
  );
}
