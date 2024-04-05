import AuthButton from "./AuthButton";
import NavButton from "./NavButton";
import { Separator } from "./ui/separator";

export default function Sidebar() {
  return (
    <aside className=" hidden h-full min-w-52 flex-col items-start border-r p-2 md:flex">
      <h1 className=" self-center text-lg font-medium">GLA Project Tracker</h1>
      <Separator />
      <div className=" flex h-full w-full flex-col">
        <AuthButton />
        <Separator />
        <div className="">
          <NavButton name="Home" href="/" />
          <NavButton name="Projects" href="" />
        </div>
      </div>
    </aside>
  );
}
