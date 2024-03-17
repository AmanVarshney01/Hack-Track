import AuthButton from "./AuthButton";
import MobileSidebar from "./MobileSidebar";

export default function Sidebar() {
  return (
    <aside className=" hidden h-full min-w-52 flex-col items-start gap-2 border-r p-2 md:flex">
      <h1 className=" self-center text-lg font-medium">GLA Project Tracker</h1>
      <div className=" flex h-full w-full flex-col justify-between">
        <div className=" p-4">
          <h2>Your Project</h2>
        </div>
        <AuthButton />
      </div>
    </aside>
  );
}
