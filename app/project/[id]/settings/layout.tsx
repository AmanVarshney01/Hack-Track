import SettingsNavButton from "@/components/SettingsNavButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  return (
    <section className="mx-auto max-w-6xl p-4">
      <Card className=" border-0">
        <CardHeader>
          <CardTitle className=" text-2xl font-semibold">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" flex w-min flex-row gap-2">
            <SettingsNavButton
              name="General"
              href={`/project/${params.id}/settings`}
            />
            <SettingsNavButton
              name="Team"
              href={`/project/${params.id}/settings/team`}
            />
            <SettingsNavButton
              name="Github"
              href={`/project/${params.id}/settings/github`}
            />
            <SettingsNavButton
              name="Delete"
              href={`/project/${params.id}/settings/delete`}
            />
          </div>
        </CardContent>
      </Card>
      {children}
    </section>
  );
}
