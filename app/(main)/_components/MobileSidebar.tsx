"use client";

import {
  DashboardIcon,
  FileIcon,
  FileTextIcon,
  GearIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavButton from "./NavButton";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const path = usePathname().split("/");
  const isProject = path[1] === "project";
  if (!isProject) {
    return;
  }
  const id = path[2];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className=" block md:hidden">
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent className="w-60 " side={"left"}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className=" flex h-full flex-col justify-between py-4">
          <div className=" flex w-full flex-col gap-4 ">
            <NavButton
              name="Dashboard"
              href={`/project/${id}`}
              icon={<DashboardIcon />}
              onClick={() => setOpen(false)}
            />
            <NavButton
              name="Tasks"
              href={`/project/${id}/tasks`}
              icon={<FileTextIcon />}
              onClick={() => setOpen(false)}
            />
            <NavButton
              name="Resources"
              href={`/project/${id}/resources`}
              icon={<FileIcon />}
              onClick={() => setOpen(false)}
            />
          </div>
          <SheetFooter className="mt-auto">
            <NavButton
              name="Project Settings"
              href={`/project/${id}/settings`}
              icon={<GearIcon />}
              onClick={() => setOpen(false)}
            />
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
