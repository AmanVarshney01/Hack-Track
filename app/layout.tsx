import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import type { Viewport } from "next";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Providers from "@/lib/providers";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "GLA Project Tracker",
  description: "A project tracker for GLA students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          " bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <main className="flex h-svh flex-col md:flex-row">
            <Navbar />
            <Sidebar />
            <section className="w-full overflow-y-auto md:m-2 md:ml-0 md:border rounded-lg h-auto">
              {children}
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
