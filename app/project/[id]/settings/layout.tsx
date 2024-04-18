import SettingsNavButton from "@/components/SettingsNavButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  return (
    <section className="mx-auto max-w-6xl">
      <div className=" flex flex-col gap-4 px-2 py-5 md:px-4 md:py-8">
        <h1 className=" text-2xl font-semibold">Settings</h1>
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
            name="Delete"
            href={`/project/${params.id}/settings/delete`}
          />
        </div>
      </div>
      {children}
    </section>
  );
}
