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

export default async function DashboardGrid({
  projectID,
}: {
  projectID: number;
}) {
  const supabase = createClient();

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
    .eq("id", projectID)
    .single();

  return (
    <section className=" flex flex-col gap-4">
      <Card className=" ">
        <CardHeader>
          <CardTitle className=" flex flex-col items-start justify-between gap-2 text-2xl md:flex-row md:items-center md:gap-4">
            <span>{project.data?.name}</span>
            <StatusBadge variant={project.data?.project_details[0].status} />
          </CardTitle>
          <CardDescription className=" text-lg">
            {project.data?.project_details[0].description}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className=" flex flex-col justify-between lg:flex-row">
        {/* <Table className=" w-auto"></Table> */}
        <div></div>
        <div className=" flex flex-col  gap-4 ">
          <Card className="">
            <CardHeader>
              <CardTitle className=" text-xl">Duration</CardTitle>
            </CardHeader>
            <CardContent className=" space-y-3">
              <div className=" flex flex-row items-center justify-between gap-4">
                <div className=" flex flex-col gap-2">
                  <span className=" font-medium">Start Date</span>
                  <span className=" text-sm">
                    {new Date(
                      project.data?.project_details[0].start_date!,
                    ).toDateString()}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className=" font-medium">End Date</span>
                  <span className=" text-sm">
                    {new Date(
                      project.data?.project_details[0].end_date!,
                    ).toDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="">
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
      </div>
    </section>
  );
}
