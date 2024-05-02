"use client";

import TooltipIcon from "@/components/TooltipIcon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { deleteResource } from "@/server/actions";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteResourceButton({
  projectId,
  resourceId,
}: {
  projectId: number;
  resourceId: number;
}) {
  const [open, setOpen] = useState(false);

  async function onSubmit() {
    await deleteResource(projectId, resourceId);
    toast.success("Resource deleted successfully");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div>
          <TooltipIcon
            content="Delete"
            icon={<TrashIcon className=" cursor-pointer text-red-600" />}
          />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-8">
          <SheetTitle>Delete Resource</SheetTitle>
          <SheetDescription>
            Are you sure you want to delete this resource?
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <form action={onSubmit}>
              <Button variant={"destructive"}>Delete</Button>
            </form>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
