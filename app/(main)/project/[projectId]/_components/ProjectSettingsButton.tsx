import NavButton from "@/app/(main)/_components/NavButton";
import { isProjectOwner } from "@/server/permissions";
import { GearIcon } from "@radix-ui/react-icons";

export default async function ProjectSettingsButton({
  projectId,
}: {
  projectId: number;
}) {
  const isProjectOwnerCheck = await isProjectOwner(projectId);

  return (
    isProjectOwnerCheck && (
      <NavButton
        name="Project Settings"
        href={`/project/${projectId}/settings`}
        icon={<GearIcon />}
      />
    )
  );
}
