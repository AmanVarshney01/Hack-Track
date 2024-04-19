import { createClient } from "@/utils/supabase/server";
import ProjectCard from "./ProjectCard";
import { User } from "@supabase/supabase-js";
import EmptyCard from "./EmptyCard";

export default async function MyProjectsGrid({ user }: { user: User }) {
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
    throw new Error(projects.error.message);
  }

  return (
    <section className=" grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {projects.data.length !== 0 ? (
        projects.data?.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            status={project.project_details[0].status}
            endDate={project.project_details[0].end_date}
          />
        ))
      ) : (
        <EmptyCard
          className="col-span-3"
          message="You have not created any projects yet. Click the button above to create a new project."
        />
      )}
    </section>
  );
}
