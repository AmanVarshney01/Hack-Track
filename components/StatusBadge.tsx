import { VariantProps, cva } from "class-variance-authority";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const statusVariants = cva("rounded-full", {
  variants: {
    variant: {
      active: "border-green-400 bg-green-100",
      paused: "border-yellow-400 bg-yellow-100",
      completed: "border-blue-400 bg-blue-100",
    },
  },
  defaultVariants: {
    variant: "active",
  },
});

export default function StatusBadge({
  variant,
}: VariantProps<typeof statusVariants>) {
  return (
    <Badge className={cn(statusVariants({ variant }), "w-min")}>
      {variant}
    </Badge>
  );
}
