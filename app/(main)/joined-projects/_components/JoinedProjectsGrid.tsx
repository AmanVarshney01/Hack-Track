import ProjectCard from "../../_components/ProjectCard";
import EmptyCard from "@/components/EmptyCard";
import { getJoinedProjects } from "@/server/queries";

export default async function JoinedProjectsGrid() {
  const joinedProjects = await getJoinedProjects();

  if (joinedProjects.error) {
    throw new Error(joinedProjects.error.message);
  }

  return (
    <section className=" grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {joinedProjects.data.length !== 0 ? (
        joinedProjects.data?.map((project) => (
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
