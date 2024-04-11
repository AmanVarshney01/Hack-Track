import ProjectsGrid from "@/components/JoinedProjectsGrid";
import { Suspense } from "react";
import ProjectsGridSkeleton from "@/components/ProjectsGridSkeleton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function JoinedProjectsPage() {
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
    <>
      <section className=" flex min-h-24 flex-row items-center justify-between p-4">
        <h1 className=" text-2xl font-medium">Joined Projects</h1>
        <Link href="/project/new">
          <Button>Create Project</Button>
        </Link>
      </section>
      <Suspense fallback={<ProjectsGridSkeleton />}>
        <ProjectsGrid user={user} />
      </Suspense>
    </>
  );
}
