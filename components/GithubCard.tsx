import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default async function GithubCard({
  githubUrl,
  isGithubConnected,
}: {
  githubUrl: string;
  isGithubConnected: boolean;
}) {
  let githubData;
  if (isGithubConnected) {
    const parsedGithubUrl = new URL(githubUrl);
    githubData = await fetch(
      `https://api.github.com/repos${parsedGithubUrl.pathname}`,
    ).then((res) => res.json());

    if (githubData.message === "Not Found") {
      throw new Error("Github Repository not found");
    }
  }

  if (!isGithubConnected) {
    return (
      <Card className=" h-min w-full">
        <CardHeader>
          <CardTitle className=" flex flex-row items-center gap-2 text-xl">
            Github Repository
          </CardTitle>
        </CardHeader>
        <CardContent className=" space-y-3">
          <CardDescription>
            Connect a Github repository to view more details
          </CardDescription>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className=" h-min w-full">
        <CardHeader>
          <CardTitle className=" flex flex-row items-center gap-2 text-xl">
            Github Repository
            <Link href={`${githubData.html_url}`} target="_blank" className="">
              <ExternalLinkIcon />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className=" space-y-3">
          <div className=" flex flex-row items-center justify-between gap-4">
            <span className=" font-medium">Name</span>
            <span className="">{githubData.name}</span>
          </div>
          <div className=" flex flex-row items-center justify-between gap-4">
            <span className=" font-medium">Last Updated</span>
            <span className="">
              {new Date(githubData.updated_at!).toDateString()}
            </span>
          </div>
          {githubData.homepage !== "" && (
            <div className=" flex flex-row items-center justify-between gap-4">
              <span className=" font-medium">Homepage</span>
              <Link href={`${githubData.homepage}`} target="_blank">
                {new URL(githubData.homepage!).hostname}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}
