import AuthButton from "./AuthButton";
import NavButton from "./NavButton";

export default function Sidebar() {
  return (
    <aside className=" hidden h-full min-w-60 flex-col items-center justify-center md:flex py-4 px-2">
      <h1 className=" text-lg font-medium pb-2">GLA Project Tracker</h1>
      <div className=" flex w-full items-center justify-center py-2">
        <AuthButton />
      </div>
      <div className=" flex h-full w-full flex-col gap-1 py-4">
        <NavButton name="Home" href="/" />
        <NavButton name="Projects" href="/project/new" />
      </div>
    </aside>
  );
}
