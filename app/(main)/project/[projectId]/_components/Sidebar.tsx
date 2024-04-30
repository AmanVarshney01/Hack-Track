import {
  DashboardIcon,
  FileIcon,
  FileTextIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import NavButton from "../../../_components/NavButton";
import { isProjectOwner } from "@/server/permissions";

export default async function Sidebar({ projectId }: { projectId: number }) {
  const isProjectOwnerCheck = await isProjectOwner(projectId);

  return (
    <aside className=" hidden h-full min-w-48 flex-col items-center justify-between border-r px-2 py-4 md:flex">
      <div className=" flex h-full w-full flex-col gap-2">
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
      <div className="flex  w-full flex-col gap-2">
        {isProjectOwnerCheck && (
          <NavButton
            name="Project Settings"
            href={`/project/${projectId}/settings`}
            icon={<GearIcon />}
          />
        )}
      </div>
    </aside>
  );
}
