import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ResourcesGrid from "./ResourcesGrid";
import AddResourceButton from "./AddResourceButton";
import { Suspense } from "react";
import ResourcesGridSkeleton from "@/components/skeletons/ResourcesGridSkeleton";

export default async function ResourcesPage({
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
      <div className=" flex flex-row items-center justify-between px-2 py-5 md:px-4 md:py-8">
        <h1 className=" text-2xl font-semibold">Resources</h1>
        <AddResourceButton id={params.id} />
      </div>
      <Suspense fallback={<ResourcesGridSkeleton />}>
        <ResourcesGrid id={params.id} />
      </Suspense>
    </div>
  );
}
