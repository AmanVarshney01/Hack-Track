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

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent className="w-52" side={"left"}>
        <SheetHeader>
          <SheetTitle>GLA Project Tracker</SheetTitle>
        </SheetHeader>
        
      </SheetContent>
    </Sheet>
  );
}
