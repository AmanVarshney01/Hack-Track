import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

export default function EmptyCard({
  className,
  message,
}: {
  className?: string;
  message: string;
}) {
  return (
    <Card
      className={cn(className, "  border-dashed border-foreground bg-card")}
    >
      <CardContent className="flex min-h-60 w-full items-center justify-center p-6">
        <p className=" text-lg">{message}</p>
      </CardContent>
    </Card>
  );
}
