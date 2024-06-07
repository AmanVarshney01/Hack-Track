import { DashboardIcon, FileIcon, FileTextIcon } from "@radix-ui/react-icons";
import NavButton from "../../../_components/NavButton";
import ProjectSettingsButton from "./ProjectSettingsButton";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Sidebar({ projectId }: { projectId: number }) {
  return (
    <aside className="hidden h-full min-w-48 flex-col items-center justify-between border-r px-2 py-4 md:flex">
      <div className="flex h-full w-full flex-col gap-2">
        <NavButton
          name="Dashboard"
          href={`/project/${projectId}`}
          icon={<DashboardIcon />}
        />
        <NavButton
          name="Tasks"
          href={`/project/${projectId}/tasks`}
          icon={<FileTextIcon />}
        />
        <NavButton
          name="Resources"
          href={`/project/${projectId}/resources`}
          icon={<FileIcon />}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <ProjectSettingsButton projectId={projectId} />
        </Suspense>
      </div>
    </aside>
  );
}
