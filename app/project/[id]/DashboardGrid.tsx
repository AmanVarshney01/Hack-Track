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
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

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

  const { html_url, updated_at, name, homepage } = await fetch(
    `https://api.github.com/repos/amanvarshney01/oxabags`,
  ).then((res) => res.json());

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
        <Card className=" h-min w-full">
          <CardHeader>
            <CardTitle className=" flex flex-row items-center gap-2 text-xl">
              Github Repository
              <Link href={html_url} target="_blank" className="">
                <ExternalLinkIcon />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className=" space-y-3">
            <div className=" flex flex-row items-center justify-between gap-4">
              <span className=" font-medium">Name</span>
              <span className="">{name}</span>
            </div>
            <div className=" flex flex-row items-center justify-between gap-4">
              <span className=" font-medium">Last Updated</span>
              <span className="">{new Date(updated_at).toDateString()}</span>
            </div>
            <div className=" flex flex-row items-center justify-between gap-4">
              <span className=" font-medium">Homepage</span>
              <Link href={homepage} target="_blank">
                {new URL(homepage).hostname}
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="h-min w-full">
          <CardHeader>
            <CardTitle className=" text-xl">Team</CardTitle>
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
