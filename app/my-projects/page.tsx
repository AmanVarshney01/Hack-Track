import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MyProjectsGrid from "@/components/MyProjectsGrid";
import ProjectsGridSkeleton from "@/components/skeletons/ProjectsGridSkeleton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function MyProjectsPage() {
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className=" text-2xl font-semibold">
              My Projects
            </CardTitle>
            <Link href="/project/new">
              <Button>Create Project</Button>
            </Link>
          </CardHeader>
        </Card>
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <MyProjectsGrid user={user} />
        </Suspense>
      </div>
    </ScrollArea>
  );
}
