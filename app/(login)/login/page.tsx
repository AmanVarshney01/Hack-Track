import SignInWithGithub from "@/components/SignInWithGithub";
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
  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-background p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Hack Track</CardTitle>
          <CardDescription className="max-w-80">
            Own it. Team it. Track it. Your projects, simplified.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {searchParams.message
              ? searchParams.message
              : "Sign in with Github to get started."}
          </p>
        </CardContent>
        <CardFooter>
          <SignInWithGithub />
        </CardFooter>
      </Card>
    </section>
  );
}
