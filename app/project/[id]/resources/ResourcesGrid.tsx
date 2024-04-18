import {
  Card,
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

export default async function ResourcesGrid({ id }: { id: number }) {
  const supabase = createClient();

  const resources = await supabase
    .from("project_resources")
    .select(
      `
    id,
    name,
    url
    `,
    )
    .eq("project_id", id);

  if (resources.error) {
    throw new Error(resources.error.message);
  }

  if (!resources.data || resources.data?.length === 0) {
    return (
      <EmptyCard message="No resources found. Add a resource to get started." />
    );
  }

  return (
    <section className=" grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {resources.data?.map((resource) => (
        <Card key={resource.id}>
          <CardHeader>
            <Link href={resource.url} target="_blank">
              <CardTitle>{resource.name}</CardTitle>
            </Link>
            <CardDescription className=" line-clamp-2">
              {resource.url}
            </CardDescription>
          </CardHeader>
          <CardFooter className=" justify-end space-x-4">
            <EditResourceButton
              id={resource.id}
              name={resource.name}
              url={resource.url}
            />
            <DeleteResourceButton id={resource.id} />
            <Link href={resource.url} target="_blank">
              <ExternalLinkIcon className=" text-blue-600" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
