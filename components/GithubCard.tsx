import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function GithubCard({
  data,
  isGithubConnected,
}: {
  data?: {
    name: string;
    updated_at: string;
    html_url: string;
    homepage: string;
  };
  isGithubConnected: boolean;
}) {
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
            <p>Connect a Github repository to view more details</p>
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
            <Link href={`${data?.html_url}`} target="_blank" className="">
              <ExternalLinkIcon />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className=" space-y-3">
          <div className=" flex flex-row items-center justify-between gap-4">
            <span className=" font-medium">Name</span>
            <span className="">{data?.name}</span>
          </div>
          <div className=" flex flex-row items-center justify-between gap-4">
            <span className=" font-medium">Last Updated</span>
            <span className="">
              {new Date(data?.updated_at!).toDateString()}
            </span>
          </div>
          <div className=" flex flex-row items-center justify-between gap-4">
            <span className=" font-medium">Homepage</span>
            {data?.homepage !== null && (
              <Link href={`${data?.homepage}`} target="_blank">
                {data?.homepage}
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}
