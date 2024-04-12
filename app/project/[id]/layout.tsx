import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className=" flex h-full flex-row">
      <Sidebar />
      <ScrollArea className="h-full w-full">{children}</ScrollArea>
    </aside>
  );
}
