import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomeGrid from "./HomeGrid";
import { Suspense } from "react";
import ProjectsGridSkeleton from "@/components/skeletons/ProjectsGridSkeleton";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <ScrollArea className="h-full w-full p-4">
      <div className=" mx-auto flex w-full max-w-7xl flex-col gap-4">
        <Card className=" border-0">
          <CardHeader className=" flex flex-row items-center gap-4">
            <Avatar className=" h-14 w-14">
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className=" text-xl">
                <span>{user.user_metadata.full_name}</span>
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <HomeGrid userId={user.id} email={user.email!} />
        </Suspense>
      </div>
    </ScrollArea>
  );
}
