import SignInWithGoogle from "@/components/SignInWithGoogle";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <section className="fixed left-0 top-0 flex min-h-svh w-full items-center justify-center bg-background">
      <Card>
        <CardHeader>
          <CardTitle className=" text-xl">GLA Project Tracker</CardTitle>
          <CardDescription className=" max-w-80">
            Streamlining project collaboration for students and mentors at GLA
            University.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {searchParams.message
              ? searchParams.message
              : "Sign in with Google to get started."}
          </p>
        </CardContent>
        <CardFooter>
          <SignInWithGoogle />
        </CardFooter>
      </Card>
    </section>
  );
}
