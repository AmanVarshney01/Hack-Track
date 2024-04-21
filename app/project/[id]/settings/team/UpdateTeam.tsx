"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { updateMembersFormSchema } from "@/utils/types";
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteMember, updateMembers } from "@/lib/actions";
import { toast } from "sonner";

export default function UpdateTeam({
  projectId,
  members,
}: {
  projectId: number;
  members: { id: number; member_email: string; role: "member" | "mentor" }[];
}) {
  const form = useForm<z.infer<typeof updateMembersFormSchema>>({
    resolver: zodResolver(updateMembersFormSchema),
    defaultValues: {
      members: members.map((member) => ({
        email: member.member_email,
        role: member.role,
      })),
    },
  });

  const { fields, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  async function onSubmit(values: z.infer<typeof updateMembersFormSchema>) {
    await updateMembers(projectId, values);
    toast.success("Members updated successfully");
  }

  async function removeMember(index: number) {
    await deleteMember(members[index].id);
    remove(index);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className=" flex flex-col justify-center gap-4 md:flex-row"
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
                <Button
                  className="w-full self-end md:w-fit"
                  variant={"destructive"}
                  onClick={() => removeMember(index)}
                >
                  <TrashIcon />
                </Button>
                <Button
                  className="w-full self-end md:w-fit"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className=" flex flex-row items-center justify-center gap-2">
                      <UpdateIcon className=" animate-spin" />
                      <span>Loading</span>
                    </div>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            ))}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
