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
import { CalendarIcon, TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(150),
  members: z.array(
    z.object({
      email: z.string().email(),
      role: z.enum(["member", "mentor"]).default("member"),
    }),
  ),
  startDate: z.date(),
  endDate: z.date(),
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

  const { fields, append, remove } = useFieldArray({
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
  }

  return (
    <Card className=" h-full w-full overflow-auto border-0  shadow-none">
      <CardHeader className="px-0 py-6 md:px-4">
        <CardTitle className="text-xl">Create a new project</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-6 md:px-4">
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
                    <Textarea placeholder="Project Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-col gap-4 md:flex-row">
              <FormField
                control={form.control}
                name={"startDate"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " flex w-[240px] pl-3",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              field.value.toDateString()
                            ) : (
                              <span>Pick start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"endDate"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " flex w-[240px] pl-3",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              field.value.toDateString()
                            ) : (
                              <span>Pick end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div className=" flex flex-row items-center justify-between pt-4 ">
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
                "Create Project"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
