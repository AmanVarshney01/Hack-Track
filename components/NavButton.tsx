"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavButton({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: React.ReactNode;
}) {
  const path = usePathname().split("/");

  const isActive =
    path.includes(href.split("/")[3]) || path[3] === href.split("/")[3];

  return (
    <Link href={href}>
      <Button
        className={cn(
          "w-full justify-start gap-2 text-base",
          isActive && "bg-accent text-accent-foreground",
        )}
        variant={"ghost"}
      >
        {icon}
        {name}
      </Button>
    </Link>
  );
}
