import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function DeleteProject({ id }: { id: number }) {
  async function onSubmit() {
    "use server";
    const response = await deleteProject(id);
    if (response.error) {
      console.error(response.error);
    }
    return redirect("/");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Project</CardTitle>
        <CardDescription>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit}>
          <Button variant="destructive">Delete Project</Button>
        </form>
      </CardContent>
    </Card>
  );
}
