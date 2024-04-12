import { HamburgerMenuIcon } from "@radix-ui/react-icons";
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

export default function MobileSidebar() {
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
          <NavButton name="Home" href="/" />
          <NavButton name="My Projects" href="/my-projects" />
          <NavButton name="Joined Projects" href="/joined-projects" />
          <NavButton name="Activity" href="/activity" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
