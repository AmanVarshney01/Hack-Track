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
import { deleteTask } from "@/lib/actions";
import { TrashIcon } from "@radix-ui/react-icons";

export default function DeleteTaskButton({ id }: { id: number }) {
  console.log("id", id);
  async function onSubmit() {
    // "use server";
    await deleteTask(id);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full gap-2" variant={"destructive"}>
          <TrashIcon />
          Delete
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-8">
          <SheetTitle>Delete Task</SheetTitle>
          <SheetDescription>
            Are you sure you want to delete this task?
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
