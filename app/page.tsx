import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const projects = await supabase
    .from("projects")
    .select(
      `
    id,
    name,
    users (
      name
    ),
    project_details (
      description,
      tech_stack
    ),
    project_members (
      users (
        name
      )
    ),
    mentors (
      users (
        name
      )
    )
    `,
    )
    .eq("created_by", user.id);

  return (
    <div className="">
      <section className=" flex flex-row items-center justify-between border-b p-4">
        <h1 className=" text-2xl font-medium">Your Projects</h1>
        <Link href="/project/new">
          <Button>Create Project</Button>
        </Link>
      </section>
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
              <CardContent>
                {/* <p className="text-sm font-light">
                  Created at: {new Date(project.created_at).toDateString()}
                </p> */}
                {project.users?.name}
                {/* {project.project_members?.[0]?.user_id} */}
                {project.mentors?.users?.name}
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </section>
    </div>
  );
}
