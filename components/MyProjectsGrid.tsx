import { createClient } from "@/utils/supabase/server";
import ProjectCard from "./ProjectCard";

// FIXME fix user type
export default async function MyProjectsGrid({ user }: { user: any }) {
  const supabase = createClient();

  const projects = await supabase
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
    .eq("created_by", user?.id);

  if (projects.error) {
    console.error(projects.error);
  }

  return (
    <section className=" grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {projects.data ? (
        projects.data?.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            // description={project.project_details[0].description}
            status={project.project_details[0].status}
            endDate={project.project_details[0].end_date}
          />
        ))
      ) : (
        <p>No projects found</p>
      )}
    </section>
  );
}
