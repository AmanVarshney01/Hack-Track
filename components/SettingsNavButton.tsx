"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function SettingsNavButton({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  const path = usePathname().split("/");
  console.log("path", path);

  const isActive =
    path.includes(href.split("/")[4]) || path[4] === href.split("/")[4];

  return (
    <Link href={href}>
      <Button
        // className={cn(
        //   "w-full justify-start gap-2 text-base",
        //   isActive && "bg-primary text-primary-foreground",
        // )}
        variant={isActive ? "secondary" : "ghost"}
      >
        {name}
      </Button>
    </Link>
  );
}
