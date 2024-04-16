import { createClient } from "@/utils/supabase/server";
import ProjectCard from "./ProjectCard";
import { Tables } from "@/utils/database.types";

export default async function JoinedProjectsGrid({
  user,
}: {
  user: Tables<"users">;
}) {
  const supabase = createClient();

  const projects = await supabase
    .from("project_members")
    .select(
      `
    member_email,
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
    .eq("member_email", user.email);

  if (projects.error) {
    console.error(projects.error);
  }

  return (
    <section className=" grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {projects.data ? (
        projects.data.map((project) => (
          <ProjectCard
            key={project.projects?.id!}
            id={project.projects?.id!}
            name={project.projects?.name!}
            status={project.projects?.project_details[0].status!}
            endDate={project.projects?.project_details[0].end_date!}
          />
        ))
      ) : (
        <p>No projects found</p>
      )}
    </section>
  );
}
