import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProjectsGrid({ user }: { user: any }) {
  const supabase = createClient();

  const projects = await supabase
    .from("projects")
    .select(
      `
    id,
    name,
    project_details (
      description    
    ),
    project_members (
      users (
        name
      )
    )
    `,
    )
    .eq("created_by", user?.id);

  if (projects.error) {
    console.error(projects.error);
  }

  return (
    <section className=" grid grid-cols-1 gap-2 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {projects.data ? (
        projects.data?.map((project) => (
          <Card className="w-full" key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>
                {project.project_details?.[0]?.description}
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        ))
      ) : (
        <p>No projects found</p>
      )}
    </section>
  );
}
