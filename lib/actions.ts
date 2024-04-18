"use server";

import { createClient } from "@/utils/supabase/server";
import { insertFormSchema, resourceFormSchema, taskFormSchema, updateDescriptionFormSchema, updateEndDateFormSchema, updateStartDateFormSchema, updateStatusFormSchema, updateTitleFormSchema } from "@/utils/types";
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
      throw new Error(insertProjects.error?.message || insertProjectDetails.error?.message);
    } else {
      return redirect(`/project/${insertProjects.data?.id}`);
    }
}

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
    throw new Error(updateProject.error.message);
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
   throw new Error(updateProject.error.message);
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
    throw new Error(updateProject.error.message);
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
    throw new Error(updateProject.error.message);
  }
}

export async function updateStatus(id: number, values: z.infer<typeof updateStatusFormSchema>) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("project_details").update({
    status: values.status
  }).eq("project_id", id)

  if (updateProject.error) {
    throw new Error(updateProject.error.message);
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

export async function insertResource(id: number, values: z.infer<typeof resourceFormSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_resources").insert({
    project_id: id,
    name: values.resourceName,
    url: values.resourceUrl,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }
} 

export async function updateResource(id: number, values: z.infer<typeof resourceFormSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_resources").update({
    name: values.resourceName,
    url: values.resourceUrl,
  }).eq("id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }
}

export async function deleteResource(id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_resources").delete().eq("id", id);

  if (response.error) {
    console.error(response.error);
  }
}

export async function insertTask(id: number, values: z.infer<typeof taskFormSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_tasks").insert({
    project_id: id,
    title: values.taskTitle,
    priority: values.priority,
    status: values.status,
    created_by: user?.id,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }
}

export async function deleteTask(id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_tasks").delete().eq("id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }
}

export async function updateTask(id: number, values: z.infer<typeof taskFormSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_tasks").update({
    title: values.taskTitle,
    priority: values.priority,
    status: values.status,
  }).eq("id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }
}

export async function saveGithubUrl(id: number, url: string) {
  const supabase = createClient();
  const response = await supabase.from("project_details").update({
    github_url: url,
  }).eq("project_id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }
}