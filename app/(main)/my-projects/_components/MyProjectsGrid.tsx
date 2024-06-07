import ProjectCard from "../../_components/ProjectCard";
import EmptyCard from "../../../../components/EmptyCard";
import { getMyProjects } from "@/server/queries";

export default async function MyProjectsGrid() {
  const myProjects = await getMyProjects();

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {myProjects.data.length !== 0 ? (
        myProjects.data?.map((project) => (
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
