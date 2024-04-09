"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createNewProject } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  members: z.array(
    z
      .object({
        email: z.string().email(),
        role: z.enum(["member", "mentor", "owner"]),
      })
      .optional(),
  ),
});

export default function CreateProject() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      members: [
        {
          email: "",
          role: "member",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    name: "members",
    control: form.control,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { insertProjectDetails, insertProjects } =
      await createNewProject(values);

    // TODO: Handle error
    if (insertProjects.error || insertProjectDetails.error) {
      console.error(insertProjects.error || insertProjectDetails.error);
    }

    form.reset();

    // console.log(values);
  }

  return (
    <Card className=" w-3/4">
      <CardHeader>
        <CardTitle className="text-xl">Create a new project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-row items-center justify-between pt-4">
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
              <div key={field.id} className=" flex flex-row gap-4">
                <FormField
                  name={`members.${index}.email`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className=" w-full">
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
                    <FormItem className="  min-w-40">
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          {/* <Input className="" placeholder="Role" {...field} /> */}
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
              </div>
            ))}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
