"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { insertMembersFormSchema } from "@/utils/types";
import { insertMembers } from "@/lib/actions";
import { toast } from "sonner";

export default function InsertTeam({ projectId }: { projectId: number }) {
  const form = useForm<z.infer<typeof insertMembersFormSchema>>({
    resolver: zodResolver(insertMembersFormSchema),
    defaultValues: {
      members: [
        {
          email: "",
          role: "member",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  async function onSubmit(values: z.infer<typeof insertMembersFormSchema>) {
    const response = await insertMembers(projectId, values);

    if (response?.error) {
      toast.error(response.error);
    }

    form.reset();
  }
  return (
    <Card>
      <CardContent className=" pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" flex flex-row items-center justify-between ">
              <h4 className=" font-semibold leading-none tracking-tight">
                Add Members
              </h4>
              <Button
                variant={"secondary"}
                onClick={() =>
                  append({
                    email: "",
                    role: "member",
                  })
                }
              >
                Add Member
              </Button>
            </div>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className=" flex flex-row items-end justify-center gap-4"
              >
                <FormField
                  name={`members.${index}.email`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className=" w-full min-w-40">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`members.${index}.role`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className=" w-full  max-w-36">
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mentor">mentor</SelectItem>
                          <SelectItem value="member">member</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button variant={"destructive"} onClick={() => remove(index)}>
                  <TrashIcon />
                </Button>
              </div>
            ))}
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
      </CardContent>
    </Card>
  );
}
