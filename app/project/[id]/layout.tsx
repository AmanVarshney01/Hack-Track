import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  return (
    <aside className=" flex h-full flex-row">
      <Sidebar id={params.id} />
      <ScrollArea className="flex h-full w-full items-center justify-center p-4">
        {children}
      </ScrollArea>
    </aside>
  );
}
