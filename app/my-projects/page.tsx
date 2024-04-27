import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MyProjectsGrid from "@/app/my-projects/MyProjectsGrid";
import ProjectsGridSkeleton from "@/components/skeletons/ProjectsGridSkeleton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default async function MyProjectsPage() {
  return (
    <ScrollArea className="h-full w-full p-4">
      <div className=" mx-auto flex w-full max-w-7xl flex-col gap-4">
        <Card className="border-0">
          <CardHeader className="flex flex-row items-center justify-between gap-4 p-2 md:p-6">
            <div className="flex flex-row items-center gap-2">
              <Link href={"/"}>
                <Button variant={"ghost"}>
                  <ArrowLeftIcon />
                </Button>
              </Link>
              <CardTitle className=" text-xl font-semibold md:text-2xl">
                My Projects
              </CardTitle>
            </div>
            <Link href="/project/new">
              <Button>Create Project</Button>
            </Link>
          </CardHeader>
        </Card>
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <MyProjectsGrid />
        </Suspense>
      </div>
    </ScrollArea>
  );
}
