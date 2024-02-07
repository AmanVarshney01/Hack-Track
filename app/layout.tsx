import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

import { cn } from "@/lib/utils";
import type { Viewport } from "next";
import Sidebar from "@/components/Sidebar";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <main className="flex min-h-svh flex-row font-sans">
              <Sidebar />
              {children}
            </main>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
