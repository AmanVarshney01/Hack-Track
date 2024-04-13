import {
  DashboardIcon,
  FileIcon,
  FileTextIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import NavButton from "./NavButton";

export default function MobileSidebar({ id }: { id: number | undefined }) {
  return (
    <Sheet>
      <SheetTrigger className=" block md:hidden">
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent className="w-60 " side={"left"}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className=" flex h-full w-full flex-col gap-4 py-4">
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
      </SheetContent>
    </Sheet>
  );
}
