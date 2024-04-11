import { createClient } from "@/utils/supabase/server";
import ProjectCard from "./ProjectCard";

// FIXME fix user type
export default async function ProjectsGrid({ user }: { user: any }) {
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
        description
      )
    )
    `,
    )
    .eq("member_email", user.email);

  if (projects.error) {
    console.error(projects.error);
  }

  return (
    <section className=" grid grid-cols-1 gap-2 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {projects.data ? (
        projects.data.map((project) => (
          <ProjectCard
            key={project.projects?.id!}
            name={project.projects?.name!}
            description={project.projects?.project_details?.[0]?.description!}
          />
        ))
      ) : (
        <p>No projects found</p>
      )}
    </section>
  );
}
