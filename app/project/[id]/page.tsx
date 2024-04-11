import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

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
    <section className=" grid grid-cols-3 gap-4">
      <Card className=" col-span-3">
        <CardHeader className=" flex-row items-center justify-between">
          <CardTitle className=" flex items-center justify-center gap-4 text-2xl">
            <span>{project.data?.name}</span>{" "}
            <Badge className=" rounded-full">
              {project.data?.project_details[0].status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className=" text-lg">
            {project.data?.project_details[0].description}
            highway ordinary calm from arrange available having term explanation
            lift list there shut nodded tree bend applied proud leg trick only
            way nature draw
          </CardDescription>
        </CardContent>
      </Card>
      <div className="col-span-2">
        <p>{project.data?.project_details[0].start_date}</p>
        <p>{project.data?.project_details[0].end_date}</p>
        {project.data?.users?.name}
        {project.data?.users?.email}
      </div>
      <div className=" flex flex-col gap-4">
        <Card>
          {/* <CardHeader>
            <CardTitle className=" text-xl">Details</CardTitle>
          </CardHeader> */}
          <CardContent className=" pt-6">
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
            <CardTitle className=" text-xl">Team Members</CardTitle>
          </CardHeader>
          <CardContent className=" space-y-3">
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
  );
}
