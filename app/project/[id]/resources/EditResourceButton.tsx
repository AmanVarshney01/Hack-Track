"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { resourceFormSchema } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updateResource } from "@/lib/actions";
import { Pencil2Icon, UpdateIcon } from "@radix-ui/react-icons";

export default function EditResourceButton({
  id,
  name,
  url,
}: {
  id: number;
  name: string;
  url: string;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof resourceFormSchema>>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: {
      resourceName: name,
      resourceUrl: url,
    },
  });

  async function onSubmit(values: z.infer<typeof resourceFormSchema>) {
    await updateResource(id, values);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Pencil2Icon className=" cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className=" pb-8">
          <SheetTitle>Edit Resource</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="resourceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resourceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <div className=" flex flex-row items-center justify-center gap-2">
                  <UpdateIcon className=" animate-spin" />
                  <span>Loading</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
