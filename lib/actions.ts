"use server";

import { createClient } from "@/utils/supabase/server";
import { formSchema } from "../app/project/new/CreateProject";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function createNewProject(values: z.infer<typeof formSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const insertProjects = await supabase
    .from("projects")
    .insert({
      name: values.name,
      created_by: user?.id,
    })
    .select("id")
    .single();

  const insertProjectDetails = await supabase.from("project_details").insert({
    project_id: insertProjects.data?.id,
    description: values.description,
    start_date: values.startDate?.toISOString(),
    end_date: values.endDate?.toISOString(),
  });

  try {
    for (const member of values.members) {
      await supabase.from("project_members").insert({
        member_email: member?.email,
        role: member?.role,
        project_id: insertProjects.data?.id,
      });
    }
  } catch (error) {
    console.error("Error inserting project members:", error);
  }

  if (insertProjects.error || insertProjectDetails.error) {
    console.error(insertProjects.error || insertProjectDetails.error);
  } else {
    return redirect(`/project/${insertProjects.data?.id}`);
  }
}

export async function deleteProject(id: number) {
  const supabase = createClient();
  const response = await supabase.from("projects").delete().eq("id", id);

  if (response.error) {
    console.error(response.error);
  } else {
    return redirect("/");
  }
}
