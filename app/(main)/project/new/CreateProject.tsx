"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createNewProject } from "@/server/actions";
import { insertFormSchema } from "@/utils/types";
import { CalendarIcon, TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export default function CreateProject() {
  const form = useForm<z.infer<typeof insertFormSchema>>({
    resolver: zodResolver(insertFormSchema),
    defaultValues: {
      projectTitle: "",
      projectDescription: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  async function onSubmit(values: z.infer<typeof insertFormSchema>) {
    await createNewProject(values);
    form.reset();
    toast.success("Project created successfully");
  }

  return (
    <Card className="h-full w-full border-0 bg-background shadow-none">
      <CardHeader className="p-2">
        <CardTitle className="text-2xl font-semibold">
          Create a new project
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="projectTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectDescription"
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
            <div className="flex flex-col gap-4 md:flex-row">
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Github Repository URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        placeholder="Github Repository URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                              "flex w-[240px] pl-3",
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
                              "flex w-[240px] pl-3",
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
                          disabled={(date) =>
                            date < form.getValues("startDate")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row items-center justify-between pt-4">
              <h4 className="font-semibold leading-none tracking-tight">
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
            {fields.length != 0 ? (
              fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col justify-center gap-4 md:flex-row"
                >
                  <FormField
                    name={`members.${index}.email`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full min-w-40">
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
                      <FormItem className="w-full max-w-36">
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
                    onClick={() => remove(index)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))
            ) : (
              <p>You have not added any members yet.</p>
            )}
            <Button
              className="w-full md:w-fit"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <UpdateIcon className="animate-spin" />
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
