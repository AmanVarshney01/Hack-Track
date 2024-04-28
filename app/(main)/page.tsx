import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomeGrid from "./_components/HomeGrid";
import { Suspense } from "react";
import ProjectsGridSkeleton from "@/components/skeletons/ProjectsGridSkeleton";
import { getUser } from "@/server/queries";

export default async function Index() {
  const user = await getUser();

  return (
    <ScrollArea className="h-full w-full p-4">
      <div className=" mx-auto flex w-full max-w-7xl flex-col gap-4">
        <Card className=" border-0">
          <CardHeader className=" flex flex-row items-center gap-4">
            <Avatar className=" h-14 w-14">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className=" text-xl">
                <span>{user.name}</span>
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <HomeGrid />
        </Suspense>
      </div>
    </ScrollArea>
  );
}
