"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export default function DeleteProject({ id }: { id: number }) {
  const formSchema = z.object({
    deleteConfirmation: z
      .string()
      .refine((value) => value === `DELETE-PROJECT-ID-${id}`, {
        message: "Confirmation does not match",
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deleteConfirmation: "",
    },
  });
  async function onSubmit() {
    await deleteProject(id);
    toast.success("Project deleted successfully");
    form.reset();
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="deleteConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type{" "}
                    <span className="text-red-500">DELETE-PROJECT-ID-{id}</span>{" "}
                    to confirm
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Type here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"destructive"}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className=" flex flex-row items-center justify-center gap-2">
                  <UpdateIcon className=" animate-spin" />
                  <span>Loading</span>
                </div>
              ) : (
                "Delete Project"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
