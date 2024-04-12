import Sidebar from "@/components/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup className=" h-full" direction={"horizontal"}>
      <ResizablePanel
        defaultSize={12}
        collapsible={true}
        collapsedSize={0}
        maxSize={12}
        minSize={12}
      >
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={88}>
        <ScrollArea className="h-full w-full">{children}</ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
