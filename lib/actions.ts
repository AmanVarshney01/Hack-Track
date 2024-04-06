"use server";

import { createClient } from "@/utils/supabase/server";
import { formSchema } from "../app/project/new/CreateProject";
import { z } from "zod";

export async function createNewProject(values: z.infer<typeof formSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const getMentorID = await supabase
    .from("mentors")
    .select("id")
    .eq("email", values.mentor_email);
  
  const insertProjects = await supabase
    .from("projects")
    .insert({
      name: values.name,
      created_by: user?.id,
      mentor_id: getMentorID.data?.[0]?.id,
    })
    .select("id");

  const insertProjectDetails = await supabase.from("project_details").insert({
    project_id: insertProjects.data?.[0]?.id,
    description: values.description,
    tech_stack: values.tech_stack,
  });

  return { insertProjects, insertProjectDetails };
}
