import NavButton from "./NavButton";

export default function Sidebar() {
  return (
    <aside className=" hidden h-full min-w-48 flex-col items-center border-r p-4 md:flex">
      <div className=" flex h-full w-full flex-col gap-4">
        <NavButton name="Dashboard" href="/" />
      </div>
    </aside>
  );
}
