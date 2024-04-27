import { VariantProps, cva } from "class-variance-authority";
import { Badge } from "../../components/ui/badge";
import { cn } from "@/lib/utils";

const statusVariants = cva("rounded-full", {
  variants: {
    variant: {
      active: "",
      paused: "",
      completed: "",
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
