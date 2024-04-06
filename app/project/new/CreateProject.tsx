"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  tech_stack: z.string().min(2).max(100),
  mentor_email: z.string().email(),
});

export default function CreateProject() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tech_stack: "",
      mentor_email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { insertProjectDetails, insertProjects } =
      await createNewProject(values);

    if (insertProjects.error || insertProjectDetails.error) {
      console.error(insertProjects.error || insertProjectDetails.error);
    }

    form.reset();
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
            <FormField
              control={form.control}
              name="tech_stack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stack</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Next.js, Supabase, Tailwind ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mentor_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentor Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mentor@gla.ac.in" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
