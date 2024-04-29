import Sidebar from "@/app/(main)/project/[projectId]/_components/Sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: number };
}) {
  return (
    <section className=" h-full overflow-clip md:flex md:flex-row">
      <Sidebar projectId={params.projectId} />
      <ScrollArea className=" h-full w-full">
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
