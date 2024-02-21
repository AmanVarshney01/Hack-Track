import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { cn } from "@/lib/utils";
import type { Viewport } from "next";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

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
  title: "Project Tracker",
  description: "A project tracker for GLA students",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-svh bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ReactQueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {session ? (
              <main className="min-h-svh font-sans">
                <Navbar />
                <section className="flex flex-row">
                  <Sidebar />
                  {children}
                </section>
              </main>
            ) : (
              <main className="min-h-svh font-sans">{children}</main>
            )}
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
