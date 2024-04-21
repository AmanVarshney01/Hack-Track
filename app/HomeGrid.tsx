import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function HomeGrid({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const supabase = createClient();

  const myProjects = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("created_by", userId);

  const joinedProjects = await supabase
    .from("project_members")
    .select("*", { count: "exact", head: true })
    .eq("member_email", email);
  return (
    <div className=" flex w-full flex-col gap-4 md:flex-row">
      <Card className="  flex w-full flex-col justify-between">
        <CardHeader>
          <CardTitle className=" text-xl">My Projects</CardTitle>
          <CardDescription>
            Manage your projects, create new projects and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>Total projects: {myProjects.count}</p>
          </div>
        </CardContent>
        <CardFooter className=" border-t p-2">
          <Link className="w-full" href={`/my-projects`}>
            <Button
              variant={"ghost"}
              className="flex w-full flex-row items-center justify-end gap-2"
            >
              View
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className=" flex w-full flex-col justify-between">
        <CardHeader>
          <CardTitle className=" text-xl">Joined Projects</CardTitle>
          <CardDescription>
            View projects you have joined as a member or mentor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>Total projects: {joinedProjects.count}</p>
          </div>
        </CardContent>
        <CardFooter className=" border-t p-2">
          <Link className="w-full" href={`/joined-projects`}>
            <Button
              variant={"ghost"}
              className="flex w-full flex-row items-center justify-end gap-2"
            >
              View
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className=" flex w-full flex-col justify-between">
        <CardHeader>
          <CardTitle className=" text-xl">Hackathons</CardTitle>
          <CardDescription>Coming Soon ...</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className=" border-t p-2">
          {/* <Link className="w-full" href={`/joined-projects`}> */}
          <Button
            variant={"ghost"}
            disabled
            className="flex w-full flex-row items-center justify-end gap-2"
          >
            View
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
          {/* </Link> */}
        </CardFooter>
      </Card>
    </div>
  );
}
