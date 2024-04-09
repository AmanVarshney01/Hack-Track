"use server";

import { createClient } from "@/utils/supabase/server";
import { formSchema } from "../app/project/new/CreateProject";
import { z } from "zod";

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
    .select("id");

  const insertProjectDetails = await supabase.from("project_details").insert({
    project_id: insertProjects.data?.[0]?.id,
    description: values.description,
  });

  try {
    for (const member of values.members) {
      await supabase.from("project_members").insert({
        project_id: insertProjects.data?.[0]?.id,
        member_email: member?.email,
        role: member?.role,
      });
    }
  } catch (error) {
    console.error("Error inserting project members:", error);
  }

  return { insertProjects, insertProjectDetails };
}
