import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProjectsGrid from "@/components/ProjectsGrid";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectsGridSkeleton() {
  return (
    <div className=" grid grid-cols-1 gap-2 p-4 lg:grid-cols-2 xl:grid-cols-3">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  );
}

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="">
      <section className=" flex flex-row items-center justify-between border-b p-4">
        <h1 className=" text-2xl font-medium">Your Projects</h1>
        <Link href="/project/new">
          <Button>Create Project</Button>
        </Link>
      </section>
      <Suspense fallback={<ProjectsGridSkeleton />}>
        <ProjectsGrid user={user} />
      </Suspense>
    </div>
  );
}
