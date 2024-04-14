import Link from "next/link";
import AuthButton from "./AuthButton";
import MobileSidebar from "./MobileSidebar";
import { Suspense } from "react";
import AuthButtonSkeleton from "./skeletons/AuthButtonSkeleton";

export default function Navbar({ params }: { params?: { id: number } }) {
  return (
    <nav className=" flex w-full flex-row justify-between border-b px-4 py-2">
      <div className="flex flex-row items-center justify-center gap-4">
        <MobileSidebar id={params?.id ?? undefined} />
        <Link href="/">
          <h1 className="text-lg font-semibold">GLA Project Tracker</h1>
        </Link>
      </div>
      <Suspense fallback={<AuthButtonSkeleton />}>
        <AuthButton />
      </Suspense>
    </nav>
  );
}
