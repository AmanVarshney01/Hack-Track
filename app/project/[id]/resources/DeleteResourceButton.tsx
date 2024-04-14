import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { deleteResource } from "@/lib/actions";
import { TrashIcon } from "@radix-ui/react-icons";

export default function DeleteResourceButton({ id }: { id: number }) {
  async function onSubmit() {
    "use server";
    await deleteResource(id);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <TrashIcon className=" cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-8">
          <SheetTitle>Delete Resource</SheetTitle>
          <SheetDescription>
            Are you sure you want to delete this resource?
          </SheetDescription>
        </SheetHeader>
        <form action={onSubmit}>
          <SheetClose>
            <Button variant={"destructive"}>Delete</Button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  );
}
