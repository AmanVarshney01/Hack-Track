import Link from "next/link";
import { Button } from "./ui/button";
import type { Route } from "next";

export default function NavButton<T extends string>({
  name,
  href,
}: {
  name: string;
  href: Route<T> | URL;
}) {
  return (
    <Link href={href}>
      <Button className="w-full justify-start" variant={"ghost"}>
        {name}
      </Button>
    </Link>
  );
}
