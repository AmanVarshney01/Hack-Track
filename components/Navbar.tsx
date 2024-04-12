import AuthButton from "./AuthButton";
import BreadcrumbNavbar from "./BreadcrumbNavbar";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <nav className=" flex w-full flex-row justify-between border-b px-4 py-2">
      <div className="flex flex-row items-center justify-center gap-4">
        <MobileSidebar />
        <h1 className="text-base font-medium">GLA Project Tracker</h1>
        {/* <BreadcrumbNavbar /> */}
      </div>
      <AuthButton />
    </nav>
  );
}
