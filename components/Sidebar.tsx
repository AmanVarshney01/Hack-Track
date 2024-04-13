import {
  DashboardIcon,
  FileIcon,
  FileTextIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import NavButton from "./NavButton";

export default function Sidebar({ id }: { id: number }) {
  return (
    <aside className=" hidden h-full min-w-48 flex-col items-center justify-between border-r px-2 py-4 md:flex">
      <div className=" flex h-full w-full flex-col gap-2">
        <NavButton
          name="Dashboard"
          href={`/project/${id}`}
          icon={<DashboardIcon />}
        />
        <NavButton
          name="Tasks"
          href={`/project/${id}/tasks`}
          icon={<FileTextIcon />}
        />
        <NavButton
          name="Resources"
          href={`/project/${id}/resources`}
          icon={<FileIcon />}
        />
      </div>
      <div className=" w-full">
        <NavButton
          name="Project Settings"
          href={`/project/${id}/settings`}
          icon={<GearIcon />}
        />
      </div>
    </aside>
  );
}
