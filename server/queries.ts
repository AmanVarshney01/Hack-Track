import "server-only"
import { createClient } from "@/utils/supabase/server";

export async function getProject(projectId: number) {
    const supabase = createClient();

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

    return response
}

export async function getProjectTasks(projectId: number) {
    const supabase = createClient();

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

    return response

}

export async function getMyProjectsCount(userId: string) {
    const supabase = createClient();

    const response = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("created_by", userId);

    return response
}

export async function getJoinedProjectsCount(email: string) {
    const supabase = createClient();
    const response = await supabase
        .from("project_members")
        .select("*", { count: "exact", head: true })
        .eq("member_email", email);

    return response
}

export async function getGithubURL(projectId: number) {
    const supabase = createClient();
    const response = await supabase
        .from("project_details")
        .select("github_url")
        .eq("project_id", projectId)
        .single();

    return response
}

export async function getProjectResources(projectId: number) {
    const supabase = createClient();
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

    return response
}