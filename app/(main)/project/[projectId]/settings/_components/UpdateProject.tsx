"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  updateTitleFormSchema,
  updateDescriptionFormSchema,
  updateEndDateFormSchema,
  updateStartDateFormSchema,
  updateStatusFormSchema,
} from "@/utils/types";
import {
  updateDescription,
  updateEndDate,
  updateStartDate,
  updateTitle,
  updateStatus,
} from "@/server/actions";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function UpdateProject({
  id,
  data,
}: {
  id: number;
  data: {
    name: string;
    project_details: {
      description: string;
      start_date: string;
      end_date: string;
      status: "active" | "completed" | "paused";
    }[];
  };
}) {
  const titleForm = useForm<z.infer<typeof updateTitleFormSchema>>({
    resolver: zodResolver(updateTitleFormSchema),
    defaultValues: {
      projectTitle: data.name,
    },
  });

  async function onUpdateTitleSubmit(
    values: z.infer<typeof updateTitleFormSchema>,
  ) {
    await updateTitle(id, values);
    toast.success("Project title updated successfully");
  }

  const descriptionForm = useForm<z.infer<typeof updateDescriptionFormSchema>>({
    resolver: zodResolver(updateDescriptionFormSchema),
    defaultValues: {
      projectDescription: data.project_details[0].description,
    },
  });

  async function onUpdateDescriptionSubmit(
    values: z.infer<typeof updateDescriptionFormSchema>,
  ) {
    await updateDescription(id, values);
    toast.success("Project description updated successfully");
  }

  const startDateForm = useForm<z.infer<typeof updateStartDateFormSchema>>({
    resolver: zodResolver(updateStartDateFormSchema),
    defaultValues: {
      startDate: new Date(data.project_details[0].start_date),
    },
  });

  async function onUpdateStartDateSubmit(
    values: z.infer<typeof updateStartDateFormSchema>,
  ) {
    await updateStartDate(id, values);
    toast.success("Project start date updated successfully");
  }

  const endDateForm = useForm<z.infer<typeof updateEndDateFormSchema>>({
    resolver: zodResolver(updateEndDateFormSchema),
    defaultValues: {
      endDate: new Date(data.project_details[0].end_date),
    },
  });

  async function onUpdateEndDateSubmit(
    values: z.infer<typeof updateEndDateFormSchema>,
  ) {
    await updateEndDate(id, values);
    toast.success("Project end date updated successfully");
  }

  const statusForm = useForm<z.infer<typeof updateStatusFormSchema>>({
    resolver: zodResolver(updateStatusFormSchema),
    defaultValues: {
      status: data.project_details[0].status,
    },
  });

  async function onUpdateStatusSubmit(
    values: z.infer<typeof updateStatusFormSchema>,
  ) {
    await updateStatus(id, values);
    toast.success("Project status updated successfully");
  }

  return (
    <section className="flex flex-col space-y-4">
      <Card>
        <CardContent className=" pt-6">
          <Form {...titleForm}>
            <form
              onSubmit={titleForm.handleSubmit(onUpdateTitleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={titleForm.control}
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
              <Button type="submit" disabled={titleForm.formState.isSubmitting}>
                {titleForm.formState.isSubmitting ? (
                  <div className=" flex flex-row items-center justify-center gap-2">
                    <UpdateIcon className=" animate-spin" />
                    <span>Loading</span>
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className=" pt-6">
          <Form {...descriptionForm}>
            <form
              onSubmit={descriptionForm.handleSubmit(onUpdateDescriptionSubmit)}
              className="space-y-8"
            >
              <FormField
                control={descriptionForm.control}
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
              <Button
                type="submit"
                disabled={descriptionForm.formState.isSubmitting}
              >
                {descriptionForm.formState.isSubmitting ? (
                  <div className=" flex flex-row items-center justify-center gap-2">
                    <UpdateIcon className=" animate-spin" />
                    <span>Loading</span>
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4 md:flex-row">
        <Card>
          <CardContent className=" pt-6">
            <Form {...statusForm}>
              <form
                onSubmit={statusForm.handleSubmit(onUpdateStatusSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={statusForm.control}
                  name={"status"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-48">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={statusForm.formState.isSubmitting}
                >
                  {statusForm.formState.isSubmitting ? (
                    <div className=" flex flex-row items-center justify-center gap-2">
                      <UpdateIcon className=" animate-spin" />
                      <span>Loading</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardContent className=" pt-6">
            <Form {...startDateForm}>
              <form
                onSubmit={startDateForm.handleSubmit(onUpdateStartDateSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={startDateForm.control}
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
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={startDateForm.formState.isSubmitting}
                >
                  {startDateForm.formState.isSubmitting ? (
                    <div className=" flex flex-row items-center justify-center gap-2">
                      <UpdateIcon className=" animate-spin" />
                      <span>Loading</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className=" pt-6">
            <Form {...endDateForm}>
              <form
                onSubmit={endDateForm.handleSubmit(onUpdateEndDateSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={endDateForm.control}
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
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={endDateForm.formState.isSubmitting}
                >
                  {endDateForm.formState.isSubmitting ? (
                    <div className=" flex flex-row items-center justify-center gap-2">
                      <UpdateIcon className=" animate-spin" />
                      <span>Loading</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
