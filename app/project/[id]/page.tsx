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
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="px-2 py-5 md:px-4 md:py-8">
        <h1 className=" text-2xl font-semibold">Dashboard</h1>
      </div>
      <Suspense fallback={<DashboardGridSkeleton />}>
        <DashboardGrid projectID={params.id} userID={user.id} />
      </Suspense>
    </div>
  );
}
