import Link from "next/link";
import ProjectsGrid from "@/components/MyProjectsGrid";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import ProjectsGridSkeleton from "@/components/ProjectsGridSkeleton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function MyProjectsPage() {
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
      <section className=" flex min-h-24 flex-row items-center justify-between border-b p-4">
        <h1 className=" text-2xl font-medium">My Projects</h1>
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
