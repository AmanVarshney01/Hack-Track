import Navbar from "@/app/(main)/_components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-svh w-full flex-col">
      <Navbar />
      {children}
      <Toaster richColors />
    </main>
  );
}
