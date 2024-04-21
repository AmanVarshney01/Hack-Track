import { Suspense } from "react";
import ProjectsGridSkeleton from "@/components/skeletons/ProjectsGridSkeleton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import JoinedProjectsGrid from "@/components/JoinedProjectsGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default async function JoinedProjectsPage() {
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
        <Card className="border-0">
          <CardHeader className="flex flex-row items-center gap-4">
            <Link href={"/"}>
              <Button variant={"ghost"}>
                <ArrowLeftIcon />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-semibold">
              Joined Projects
            </CardTitle>
          </CardHeader>
        </Card>
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <JoinedProjectsGrid user={user} />
        </Suspense>
      </div>
    </ScrollArea>
  );
}
