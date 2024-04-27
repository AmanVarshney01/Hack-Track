import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import EditResourceButton from "./EditResourceButton";
import DeleteResourceButton from "./DeleteResourceButton";
import EmptyCard from "@/components/EmptyCard";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProjectResources } from "@/server/queries";

export default async function ResourcesGrid({
  projectId,
  userId,
}: {
  projectId: number;
  userId: string;
}) {
  const supabase = createClient();

  const resources = await getProjectResources(projectId);

  if (resources.error) {
    throw new Error(resources.error.message);
  }

  if (!resources.data || resources.data?.length === 0) {
    return (
      <EmptyCard message="No resources found. Add a resource to get started." />
    );
  }

  const projectOwnerId = await supabase
    .from("projects")
    .select("created_by")
    .eq("id", projectId)
    .single();

  if (projectOwnerId.error) {
    throw new Error(projectOwnerId.error.message);
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
            <CardFooter className=" justify-end space-x-4">
              {(resource.created_by === userId ||
                projectOwnerId.data.created_by === userId) && (
                <>
                  <EditResourceButton
                    id={resource.id}
                    name={resource.name}
                    url={resource.url}
                  />
                  <DeleteResourceButton id={resource.id} />
                </>
              )}
              <Link href={resource.url} target="_blank">
                <ExternalLinkIcon className=" text-blue-600" />
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
}
