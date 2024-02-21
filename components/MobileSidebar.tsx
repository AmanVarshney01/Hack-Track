import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className=" block md:hidden">
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent className="w-52" side={"left"}>
        <SheetHeader>Project</SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
