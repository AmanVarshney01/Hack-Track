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
    <section className=" flex h-full flex-row overflow-clip">
      <Sidebar id={params.id} />
      <ScrollArea className=" flex-1 p-4">{children}</ScrollArea>
    </section>
  );
}
