import Link from "next/link";
import { Button } from "./ui/button";

export default function NavButton({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Button className="w-full justify-start" variant={"ghost"}>
        {name}
      </Button>
    </Link>
  );
}
