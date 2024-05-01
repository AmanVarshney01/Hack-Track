import SettingsNavButton from "@/app/(main)/project/[projectId]/settings/_components/SettingsNavButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: number };
}) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4 p-2">
      <Card className=" border-0 bg-background shadow-none">
        <CardHeader>
          <CardTitle className=" text-2xl font-semibold">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" flex w-min flex-row gap-2">
            <SettingsNavButton
              name="General"
              href={`/project/${params.projectId}/settings`}
            />
            <SettingsNavButton
              name="Team"
              href={`/project/${params.projectId}/settings/team`}
            />
            <SettingsNavButton
              name="Github"
              href={`/project/${params.projectId}/settings/github`}
            />
            <SettingsNavButton
              name="Delete"
              href={`/project/${params.projectId}/settings/delete`}
            />
          </div>
        </CardContent>
      </Card>
      {children}
    </section>
  );
}
