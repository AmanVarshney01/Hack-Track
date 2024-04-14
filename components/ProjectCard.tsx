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
  const formattedEndDate = new Date(endDate).toDateString();

  return (
    <Card className="w-full">
      <CardHeader className=" space-y-2">
        <CardTitle className=" text-xl">{name}</CardTitle>
        <CardDescription>
          <StatusBadge variant={status} />
        </CardDescription>
      </CardHeader>
      <CardContent className=" text-sm text-muted-foreground">
        <div className=" flex flex-col">
          <span>End Date</span>
          <span>{formattedEndDate}</span>
        </div>
      </CardContent>
      <CardFooter className=" border-t p-2">
        <Link className="w-full" href={`/project/${id}`}>
          <Button
            variant={"ghost"}
            className="flex w-full flex-row items-center justify-end gap-2"
          >
            View
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
