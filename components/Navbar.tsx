import Link from "next/link";
import AuthButton from "./AuthButton";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <nav className=" flex w-full flex-row justify-between border-b px-4 py-2">
      <div className="flex flex-row items-center justify-center gap-4">
        <MobileSidebar />
        <Link href="/">
          <h1 className="text-lg font-semibold">GLA Project Tracker</h1>
        </Link>
      </div>
      <AuthButton />
    </nav>
  );
}
