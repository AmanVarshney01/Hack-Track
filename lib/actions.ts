"use server";

import { createClient } from "@/utils/supabase/server";
import { insertFormSchema, updateDescriptionFormSchema, updateEndDateFormSchema, updateStartDateFormSchema, updateTitleFormSchema } from "@/utils/types";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function createNewProject(
  values: z.infer<typeof insertFormSchema>,
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

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

    for (const member of values.members) {
      await supabase.from("project_members").insert({
        member_email: member?.email,
        role: member?.role,
        project_id: insertProjects.data?.id,
      });
    }

    if (insertProjects.error || insertProjectDetails.error) {
      console.error(insertProjects.error || insertProjectDetails.error);
    } else {
      return redirect(`/project/${insertProjects.data?.id}`);
    }
}

// export async function updateProject(id: number, values: z.infer<typeof updateFormSchema>) {
//   const supabase = createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect("/login");
//   }

//     const updateProject = await supabase.from("projects").update({
//       name: values.name,
//     }).eq("id", id);

//     const updateProjectDetails = await supabase.from("project_details").update({
//       description: values.description,
//       start_date: values.startDate?.toISOString(),
//       end_date: values.endDate?.toISOString(),
//     }).eq("project_id", id);

//     if (updateProject.error || updateProjectDetails.error) {
//       console.error(updateProject.error || updateProjectDetails.error);
//     }

// }

export async function updateTitle(id: number, values: z.infer<typeof updateTitleFormSchema>) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("projects").update({
    name: values.name,
  }).eq("id", id);

  if (updateProject.error) {
    console.error(updateProject.error);
  }
}

export async function updateDescription(id: number, values: z.infer<typeof updateDescriptionFormSchema>) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("project_details").update({
    description: values.description
  }).eq("project_id", id)

  if (updateProject.error) {
    console.error(updateProject.error);
  }
}

export async function updateStartDate(id: number, values: z.infer<typeof updateStartDateFormSchema>) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("project_details").update({
    start_date: values.startDate?.toISOString()
  }).eq("project_id", id)

  if (updateProject.error) {
    console.error(updateProject.error);
  }
}

export async function updateEndDate(id: number, values: z.infer<typeof updateEndDateFormSchema>) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("project_details").update({
    end_date: values.endDate?.toISOString()
  }).eq("project_id", id)

  if (updateProject.error) {
    console.error(updateProject.error);
  }
}

export async function deleteProject(id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  
  const response = await supabase.from("projects").delete().eq("id", id);

    if (response.error) {
      console.error(response.error);
    } else {
      return redirect("/");
    }
}
