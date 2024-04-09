import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import type { Viewport } from "next";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Providers from "@/components/providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
          <main className="flex h-svh flex-col bg-muted/10 md:flex-row md:py-2 md:pr-2">
            <Navbar />
            <Sidebar />
            <section className="h-full w-full overflow-y-auto rounded-lg bg-background p-2 md:border md:p-4">
              {children}
              <Analytics />
              <SpeedInsights />
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
