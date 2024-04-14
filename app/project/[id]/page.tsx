import ProjectTasksTable from "@/components/ProjectTasksTable";
import StatusBadge from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  if (!user) {
    return redirect("/login");
  }

  const project = await supabase
    .from("projects")
    .select(
      `
  name,
  users (
    name,
    email
  ),
  project_details (
    description,
    start_date,
    end_date,
    status
  ),
  project_members (
    member_email,
    users (
      name
    ),
    role
  )
  `,
    )
    .eq("id", params.id)
    .single();

  return (
    <div className="mx-auto max-w-6xl">
      <div className=" py-4">
        <h1 className=" text-2xl font-semibold">Dashboard</h1>
      </div>
      <section className=" grid grid-cols-3 gap-4">
        <Card className=" col-span-3">
          <CardHeader>
            <CardTitle className=" flex items-center justify-between gap-4 text-2xl">
              <span>{project.data?.name}</span>
              <StatusBadge variant={project.data?.project_details[0].status} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className=" text-lg">
              {project.data?.project_details[0].description}
            </CardDescription>
          </CardContent>
        </Card>
        <div className="col-span-2">
          <ProjectTasksTable />
        </div>
        <div className=" flex flex-col gap-4">
          <Card className="">
            <CardHeader>
              <CardTitle className=" text-xl">Duration</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className=" flex flex-row items-center justify-between">
                <div className=" flex flex-col gap-2">
                  <span className=" font-medium">Start Date</span>{" "}
                  <span className=" text-sm">
                    {new Date(
                      project.data?.project_details[0].start_date!,
                    ).toDateString()}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className=" font-medium">End Date</span>{" "}
                  <span className=" text-sm">
                    {new Date(
                      project.data?.project_details[0].end_date!,
                    ).toDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className=" col-span-1">
            <CardHeader>
              <CardTitle className=" text-xl">Team</CardTitle>
            </CardHeader>
            <CardContent className=" space-y-3">
              <div className=" flex flex-row items-center justify-between gap-4">
                <span className="">{project.data?.users?.name}</span>
                <Badge className=" rounded-full">Owner</Badge>
              </div>
              {project.data?.project_members.map((member) => (
                <div
                  className=" flex flex-row items-center justify-between gap-4"
                  key={member.member_email}
                >
                  <span className="">{member.users?.name}</span>
                  <Badge className=" rounded-full">{member.role}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
