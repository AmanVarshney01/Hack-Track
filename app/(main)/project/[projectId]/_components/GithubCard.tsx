import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default async function GithubCard({
  projectId,
  githubUrl,
  isGithubConnected,
}: {
  projectId: number;
  githubUrl: string;
  isGithubConnected: boolean;
}) {
  if (!isGithubConnected) {
    return (
      <Card className="h-min w-full">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2 text-xl">
            Github Repository
          </CardTitle>
          <CardDescription>
            Connect a Github repository to view more details
          </CardDescription>
        </CardHeader>
        {/* <CardContent className="space-y-3">
          <Link href={`/project/${projectId}/settings/github`}>
            <Button>Connect Github</Button>
          </Link>
        </CardContent> */}
      </Card>
    );
  }

  try {
    const parsedGithubUrl = new URL(githubUrl);
    const response = await fetch(
      `https://api.github.com/repos${parsedGithubUrl.pathname}`,
    );

    if (!response.ok) {
      throw new Error("Github Repository not found");
    }

    const githubData = await response.json();

    return (
      <Card className="h-min w-full">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2 text-xl">
            Github Repository
            <Link href={`${githubData.html_url}`} target="_blank" className="">
              <ExternalLinkIcon />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-row items-center justify-between gap-4">
            <span className="font-medium">Name</span>
            <span>{githubData.name}</span>
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <span className="font-medium">Last Updated</span>
            <span>{new Date(githubData.updated_at!).toDateString()}</span>
          </div>
          {githubData.homepage !== "" && (
            <div className="flex flex-row items-center justify-between gap-4">
              <span className="font-medium">Homepage</span>
              <Link href={`${githubData.homepage}`} target="_blank">
                {new URL(githubData.homepage!).hostname}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error(error);
    return (
      <Card className="h-min w-full">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2 text-xl">
            Github Repository
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Invalid Github Repository URL</CardDescription>
        </CardContent>
      </Card>
    );
  }
}
