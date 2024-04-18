import { Card, CardContent } from "./ui/card";

export default function EmptyCard({ message }: { message: string }) {
  return (
    <Card className="  border-dashed border-foreground bg-muted/10">
      <CardContent className="flex min-h-60 w-full items-center justify-center p-6">
        <p className=" text-lg">{message}</p>
      </CardContent>
    </Card>
  );
}
