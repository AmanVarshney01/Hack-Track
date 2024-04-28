import Sidebar from "@/app/(main)/project/[id]/_components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  return (
    <section className=" h-full overflow-clip md:flex md:flex-row">
      <Sidebar id={params.id} />
      <ScrollArea className=" h-full w-full">{children}</ScrollArea>
    </section>
  );
}
