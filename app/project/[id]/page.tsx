import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardGrid from "./DashboardGrid";
import { Suspense } from "react";
import DashboardGridSkeleton from "@/components/skeletons/DashboardGridSkeleton";

export default async function ProjectPage({
  params,
}: {
  params: { id: number };
}) {
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
    <div className="mx-auto max-w-6xl">
      <div className=" py-10">
        <h1 className=" text-2xl font-semibold">Dashboard</h1>
      </div>
      <Suspense fallback={<DashboardGridSkeleton />}>
        <DashboardGrid projectID={params.id} />
      </Suspense>
    </div>
  );
}
