import { createClient } from "@/utils/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// FIXME fix user type
export default async function ProjectsGrid({ user }: { user: any }) {
  const supabase = createClient();

  //   const projects = await supabase
  //     .from("projects")
  //     .select(
  //       `
  //     id,
  //     name,
  //     project_details (
  //       description
  //     ),
  //     project_members (
  //       member_email,
  //       role
  //     )
  //     `,
  //     )
  //     .eq("project_members.member_email", user?.email);

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
    .eq("member_email", user?.email);

  if (projects.error) {
    console.error(projects.error);
  }

  return (
    <section className=" grid grid-cols-1 gap-2 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {projects.data ? (
        projects.data?.map((project) => (
          <Card className="w-full" key={project.projects?.id}>
            <CardHeader>
              <CardTitle>{project.projects?.name}</CardTitle>
              <CardDescription>
                {project.projects?.project_details?.[0]?.description}
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))
      ) : (
        <p>No projects found</p>
      )}
    </section>
  );
}
