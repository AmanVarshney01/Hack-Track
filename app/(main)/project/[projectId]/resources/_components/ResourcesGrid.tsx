import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import EditResourceButton from "./EditResourceButton";
import DeleteResourceButton from "./DeleteResourceButton";
import EmptyCard from "@/components/EmptyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProjectResources } from "@/server/queries";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default async function ResourcesGrid({
  projectId,
}: {
  projectId: number;
}) {
  const resources = await getProjectResources(projectId);

  if (!resources.data || resources.data?.length === 0) {
    return (
      <EmptyCard message="No resources found. Add a resource to get started." />
    );
  }

  return (
    <section className=" grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {resources.data?.map((resource) => {
        const faviconUrl = new URL(resource.url).origin + "/favicon.ico";
        return (
          <Card key={resource.id} className=" flex flex-col justify-between">
            <CardHeader>
              <Link href={resource.url} target="_blank">
                <CardTitle className="flex flex-row items-center gap-2">
                  <Avatar className=" h-6 w-6 border-2 border-foreground">
                    <AvatarImage className=" bg-white" src={faviconUrl} />
                    <AvatarFallback>
                      {resource.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className=" capitalize">{resource.name}</span>
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <CardDescription className=" line-clamp-2">
                {resource.url}
              </CardDescription>
            </CardContent>
            <CardFooter className=" justify-end space-x-4 px-6 pb-4 pt-0">
              <EditResourceButton
                projectId={projectId}
                resourceId={resource.id}
                name={resource.name}
                url={resource.url}
              />
              <DeleteResourceButton
                projectId={projectId}
                resourceId={resource.id}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={resource.url} target="_blank">
                      <Button size={"icon"} variant={"ghost"}>
                        <ExternalLinkIcon className=" text-blue-600" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Open</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
}
