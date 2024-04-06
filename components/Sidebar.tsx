import AuthButton from "./AuthButton";
import NavButton from "./NavButton";

export default function Sidebar() {
  return (
    <aside className=" hidden h-full min-w-60 flex-col items-center justify-center px-2 py-4 md:flex">
      <h1 className=" pb-2 text-lg font-medium">GLA Project Tracker</h1>
      <div className=" flex h-full w-full flex-col gap-1 py-4">
        <NavButton name="Home" href="/" />
        <NavButton name="Projects" href="/project/new" />
      </div>
      <div className=" flex w-full items-center justify-center py-2">
        <AuthButton />
      </div>
    </aside>
  );
}
