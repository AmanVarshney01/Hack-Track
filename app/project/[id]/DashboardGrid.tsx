import GithubCard from "@/components/GithubCard";
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
  userID,
}: {
  projectID: number;
  userID: string;
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
    status,
    github_url
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

  if (project.error) {
    throw new Error(project.error.message);
  }

  const isGithubConnected =
    project.data?.project_details[0].github_url !== null;

  let githubData;
  if (isGithubConnected) {
    const githubUrl = new URL(project.data?.project_details[0].github_url!);
    githubData = await fetch(
      `https://api.github.com/repos${githubUrl.pathname}`,
    ).then((res) => res.json());

    if (githubData.message === "Not Found") {
      throw new Error("Repository not found");
    }
  }

  return (
    <section className=" flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className=" flex flex-col items-start justify-between gap-2 text-2xl md:flex-row md:items-center md:gap-4">
            <span>{project.data?.name}</span>
            <StatusBadge variant={project.data?.project_details[0].status} />
          </CardTitle>
          <CardDescription className=" text-lg">
            {project.data?.project_details[0].description}
          </CardDescription>
        </CardHeader>
        <CardContent className=" space-y-3 pt-4">
          <div className=" flex flex-row items-center gap-6">
            <div className="flex flex-col gap-2">
              <span className=" font-medium">Created By</span>
              <span className=" text-sm">{project.data?.users?.name}</span>
            </div>
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
      <div className=" flex flex-col gap-4 lg:flex-row">
        <GithubCard
          data={{
            name: githubData?.name,
            updated_at: githubData?.updated_at,
            html_url: githubData?.html_url,
            homepage: githubData?.homepage,
          }}
          isGithubConnected={isGithubConnected}
        />
        <Card className="h-min w-full">
          <CardHeader>
            <CardTitle className=" text-xl">Team Members</CardTitle>
          </CardHeader>
          <CardContent className=" space-y-4">
            <div className=" flex flex-row items-center justify-between gap-4">
              <div className=" flex flex-col">
                <span className="">{project.data?.users?.name}</span>
                <span className=" text-sm text-muted-foreground">
                  {project.data?.users?.email}
                </span>
              </div>
              <Badge className=" rounded-full">owner</Badge>
            </div>
            {project.data?.project_members.map((member) => (
              <div
                className=" flex flex-row items-center justify-between gap-4"
                key={member.member_email}
              >
                <div className=" flex flex-col">
                  <span className="">{member.users?.name}</span>
                  <span className=" text-sm text-muted-foreground">
                    {member.member_email}
                  </span>
                </div>
                <Badge className=" rounded-full">{member.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
