"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function SettingsNavButton({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  const path = usePathname().split("/");

  const isActive =
    path.includes(href.split("/")[4]) || path[4] === href.split("/")[4];

  return (
    <Link href={href} prefetch={false}>
      <Button variant={isActive ? "secondary" : "ghost"}>{name}</Button>
    </Link>
  );
}
