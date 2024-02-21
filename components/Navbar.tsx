import AuthButton from "./AuthButton";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <nav className="flex w-full flex-row justify-between border-b px-4 py-2">
      <div className="flex flex-row gap-4">
        <MobileSidebar />
        <h1 className=" text-lg font-medium">GLA Project Tracker</h1>
      </div>
      <AuthButton />
    </nav>
  );
}
