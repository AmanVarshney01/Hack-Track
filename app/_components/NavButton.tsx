"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
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
        className={"w-full justify-start gap-2 text-base"}
        variant={isActive ? "secondary" : "ghost"}
      >
        {icon}
        {name}
      </Button>
    </Link>
  );
}
