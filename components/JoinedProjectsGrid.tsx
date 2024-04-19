import { createClient } from "@/utils/supabase/server";
import ProjectCard from "./ProjectCard";
import { User } from "@supabase/supabase-js";
import EmptyCard from "./EmptyCard";

export default async function JoinedProjectsGrid({ user }: { user: User }) {
  const supabase = createClient();

  const projects = await supabase
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

  if (projects.error) {
    throw new Error(projects.error.message);
  }

  return (
    <section className=" grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {projects.data.length !== 0 ? (
        projects.data?.map((project) => (
          <ProjectCard
            key={project.projects?.id!}
            id={project.projects?.id!}
            name={project.projects?.name!}
            status={project.projects?.project_details[0].status!}
            endDate={project.projects?.project_details[0].end_date!}
            role={project.role}
          />
        ))
      ) : (
        <EmptyCard
          className="col-span-3"
          message="No one has added you to their projects yet."
        />
      )}
    </section>
  );
}
