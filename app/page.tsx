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
    created_by,
    created_at,
    project_details (
      description,
      tech_stack
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
      <section className=" flex flex-row flex-wrap gap-2 p-4">
        {projects.data ? (
          projects.data?.map((project) => (
            <Card key={project.id}>
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
    </div>
  );
}
