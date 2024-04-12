import Link from "next/link";
import { Button } from "./ui/button";

export default function NavButton({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Button
        className="w-full justify-start gap-2 text-base"
        variant={"ghost"}
      >
        {icon}
        {name}
      </Button>
    </Link>
  );
}
