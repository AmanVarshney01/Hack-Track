import "server-only"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export async function getUser() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return {
        id: user.id,
        name: user.user_metadata.full_name,
        email: user.email,
        avatarUrl: user.user_metadata.avatar_url,
    }

}

export async function getProjectOwner(projectId: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("projects")
        .select("created_by")
        .eq("id", projectId)
        .single();

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getProject(projectId: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("projects")
        .select(
            `
        name,
        users (
            name,
            email
        ),
        project_details (
            description,
            start_date,
            end_date,
            status,
            github_url
        ),
        project_members (
            member_email,
            users (
                name
            ),
            role
        )
        `,
        )
        .eq("id", projectId)
        .single();

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getProjectTasks(projectId: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("project_tasks")
        .select(
            `
            id,
            title,
            created_by:users(name),
            priority,
            status    
            `,
        )
        .eq("project_id", projectId);

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response

}

export async function getProjectTaskOwner(taskId: number) {
    const supabase = createClient();

    const response = await supabase
        .from("project_tasks")
        .select("created_by")
        .eq("id", taskId)
        .single();

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getMyProjects() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("projects")
        .select(
            `
            id,
            name,
            project_details (
                status,
                end_date   
            )
            `,
        )
        .eq("created_by", user.id);

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getJoinedProjects() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("project_members")
        .select(
            `
            role,
            projects (
                id,
                name,
                project_details (
                    status,
                    end_date
                )
            )
            `,
        )
        .eq("member_email", user.email!);

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getMyProjectsCount() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("created_by", user.id);

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getJoinedProjectsCount() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("project_members")
        .select("*", { count: "exact", head: true })
        .eq("member_email", user.email!);

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getGithubURL(projectId: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("project_details")
        .select("github_url")
        .eq("project_id", projectId)
        .single();

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getProjectResources(projectId: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("project_resources")
        .select(
            `
            id,
            name,
            url,
            created_by
            `,
        )
        .eq("project_id", projectId);

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getProjectMembers(projectId: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("project_members")
        .select(
            `
            id,
            member_email,
            role
            `,
        )
        .eq("project_id", projectId);

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}

export async function getProjectDetails(projectId: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const response = await supabase
        .from("projects")
        .select(
            `
            name,
            created_by,
            project_details (
                description,
                start_date,
                end_date,
                status
            )
            `,
        )
        .eq("id", projectId)
        .single();

    if (response.error) {
        throw new Error(response.error.message)
    }

    return response
}