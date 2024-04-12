import Link from "next/link";
import MyProjectsGrid from "@/components/MyProjectsGrid";
import JoinedProjectsGrid from "@/components/JoinedProjectsGrid";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import ProjectsGridSkeleton from "@/components/ProjectsGridSkeleton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
    <div className=" mx-auto flex w-full max-w-7xl flex-col gap-10 p-2 md:p-4">
      <section className="">
        <div className="flex flex-row items-center justify-between p-4">
          <h1 className=" text-2xl font-medium">My Projects</h1>
          <Link href="/project/new">
            <Button>Create Project</Button>
          </Link>
        </div>
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <MyProjectsGrid user={user} />
        </Suspense>
      </section>
      <section className="">
        <div className="flex flex-row items-center p-4">
          <h1 className=" text-2xl font-medium">Joined Projects</h1>
        </div>
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <JoinedProjectsGrid user={user} />
        </Suspense>
      </section>
    </div>
  );
}
