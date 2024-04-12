import { DashboardIcon, FileIcon, FileTextIcon } from "@radix-ui/react-icons";
import NavButton from "./NavButton";

export default function Sidebar() {
  return (
    <aside className=" hidden h-full min-w-48 flex-col items-center border-r px-2 py-4 md:flex">
      <div className=" flex h-full w-full flex-col gap-2">
        <NavButton name="Dashboard" href="/" icon={<DashboardIcon />} />
        <NavButton name="Tasks" href="/tasks" icon={<FileTextIcon />} />
        <NavButton name="Resources" href="/resources" icon={<FileIcon />} />
      </div>
    </aside>
  );
}
