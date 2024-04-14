import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

export default function ProjectCard({
  id,
  name,
  status,
  endDate,
}: {
  id: number;
  name: string;
  status: "active" | "paused" | "completed" | null | undefined;
  endDate: string;
}) {
  return (
    <Card className="w-full">
      <CardHeader className=" space-y-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <StatusBadge variant={status} />
        </CardDescription>
      </CardHeader>
      <CardContent>End Date: {endDate}</CardContent>
      <CardFooter className=" justify-end border-t p-2">
        <Link href={`/project/${id}`}>
          <Button
            variant={"ghost"}
            className="flex flex-row items-center justify-center gap-2"
          >
            View
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
