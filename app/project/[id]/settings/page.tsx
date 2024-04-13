import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className=" py-4">
        <h1 className=" text-2xl font-semibold">Settings</h1>
      </div>
      <Tabs defaultValue="update">
        <TabsList className="gap-4">
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="update">Update PRoject</TabsContent>
        <TabsContent value="delete">Delete Project</TabsContent>
      </Tabs>
    </div>
  );
}
