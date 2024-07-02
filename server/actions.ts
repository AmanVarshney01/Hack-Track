"use server";

import { createClient } from "@/utils/supabase/server";
import { insertFormSchema, insertMembersFormSchema, resourceFormSchema, taskFormSchema, updateDescriptionFormSchema, updateEndDateFormSchema, updateMembersFormSchema, updateStartDateFormSchema, updateStatusFormSchema, updateTitleFormSchema } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getUser } from "./queries";

export async function createNewProject(
  values: z.infer<typeof insertFormSchema>,
) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const insertProjects = await supabase
    .from("projects")
    .insert({
      name: values.projectTitle,
      created_by: user?.id,
    })
    .select("id")
    .single();

  const insertProjectDetails = await supabase.from("project_details").insert({
    project_id: insertProjects.data?.id,
    description: values.projectDescription,
    start_date: values.startDate?.toDateString(),
    end_date: values.endDate?.toDateString(),
  });

  for (const member of values.members) {
    await supabase.from("project_members").insert({
      project_id: insertProjects.data?.id!,
      member_email: member.email,
      role: member.role,
    });
  }

  if (insertProjects.error || insertProjectDetails.error) {
    throw new Error(insertProjects.error?.message || insertProjectDetails.error?.message);
  } else {
    revalidatePath(`/`)
    return redirect(`/project/${insertProjects.data?.id}`);
  }
}

export async function updateTitle(projectId: number, values: z.infer<typeof updateTitleFormSchema>) {
  const supabase = createClient()
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("projects").update({
    name: values.projectTitle,
  }).eq("id", projectId);

  if (updateProject.error) {
    throw new Error(updateProject.error.message);
  }
  revalidatePath(`/project/${projectId}`)
}

export async function updateDescription(projectId: number, values: z.infer<typeof updateDescriptionFormSchema>) {
  const supabase = createClient()
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("project_details").update({
    description: values.projectDescription
  }).eq("project_id", projectId)

  if (updateProject.error) {
    throw new Error(updateProject.error.message);
  }
  revalidatePath(`/project/${projectId}`)
}

export async function updateStartDate(projectId: number, values: z.infer<typeof updateStartDateFormSchema>) {
  const supabase = createClient()
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("project_details").update({
    start_date: values.startDate?.toDateString()
  }).eq("project_id", projectId)

  if (updateProject.error) {
    throw new Error(updateProject.error.message);
  }

  revalidatePath(`/project/${projectId}`)
}

export async function updateEndDate(projectId: number, values: z.infer<typeof updateEndDateFormSchema>) {
  const supabase = createClient()
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("project_details").update({
    end_date: values.endDate?.toDateString()
  }).eq("project_id", projectId)

  if (updateProject.error) {
    throw new Error(updateProject.error.message);
  }

  revalidatePath(`/project/${projectId}`)
}

export async function updateStatus(projectId: number, values: z.infer<typeof updateStatusFormSchema>) {
  const supabase = createClient()
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const updateProject = await supabase.from("project_details").update({
    status: values.status
  }).eq("project_id", projectId)

  if (updateProject.error) {
    throw new Error(updateProject.error.message);
  }

  revalidatePath(`/project/${projectId}`)
}

export async function deleteProject(projectId: number) {

  const supabase = createClient();

  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("projects").delete().eq("id", projectId);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return redirect("/");

}

export async function insertResource(projectId: number, values: z.infer<typeof resourceFormSchema>) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_resources").insert({
    project_id: projectId,
    name: values.resourceName,
    url: values.resourceUrl,
    created_by: user?.id,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  revalidatePath(`/project/${projectId}/resources`)
}

export async function updateResource(projectId: number, resourceId: number, values: z.infer<typeof resourceFormSchema>) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_resources").update({
    name: values.resourceName,
    url: values.resourceUrl,
  }).eq("id", resourceId);

  if (response.error) {
    throw new Error(response.error.message);
  }

  revalidatePath(`/project/${projectId}/resources`)
}

export async function deleteResource(projectId: number, resourceId: number) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_resources").delete().eq("id", resourceId);

  if (response.error) {
    throw new Error(response.error.message);
  }

  revalidatePath(`/project/${projectId}/resources`)
}

export async function insertTask(projectId: number, values: z.infer<typeof taskFormSchema>) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_tasks").insert({
    project_id: projectId,
    title: values.taskTitle,
    priority: values.priority,
    status: values.status,
    created_by: user?.id,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  revalidatePath(`/project/${projectId}/tasks`)
}

export async function deleteTask(projectId: number, taskId: number) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_tasks").delete().eq("id", taskId);

  if (response.error) {
    throw new Error(response.error.message);
  }

  revalidatePath(`/project/${projectId}/tasks`)
}

export async function updateTask(projectId: number, taskId: number, values: z.infer<typeof taskFormSchema>) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_tasks").update({
    title: values.taskTitle,
    priority: values.priority,
    status: values.status,
  }).eq("id", taskId);

  if (response.error) {
    throw new Error(response.error.message);
  }

  revalidatePath(`/project/${projectId}/tasks`)
}

export async function saveGithubUrl(id: number, url: string) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }
  const response = await supabase.from("project_details").update({
    github_url: url,
  }).eq("project_id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  revalidatePath(`/project/${id}`)
}

export async function updateMembers(id: number, values: z.infer<typeof updateMembersFormSchema>) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  for (const member of values.members) {
    const response = await supabase.from("project_members").update({
      member_email: member.email,
      role: member.role,
    }).eq("project_id", id)

    if (response.error) {
      throw new Error(response.error.message);
    }
  }

  revalidatePath(`/project/${id}`)
}

export async function insertMembers(id: number, values: z.infer<typeof insertMembersFormSchema>) {
  const supabase = createClient();
  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  for (const member of values.members) {
    const response = await supabase.from("project_members").insert({
      project_id: id,
      member_email: member.email,
      role: member.role,
    });

    if (response.error) {
      if (response.status === 409) {
        return {
          error: "Member already exists",
        }
      }
      throw new Error(response.error.message);
    }
  }

  revalidatePath(`/project/${id}`)
}

export async function deleteMember(id: number) {
  const supabase = createClient();

  const user = await getUser();


  if (!user) {
    return redirect("/login");
  }

  const response = await supabase.from("project_members").delete().eq("id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  revalidatePath(`/project/${id}`)
}