import Sidebar from "@/components/Sidebar";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
}
