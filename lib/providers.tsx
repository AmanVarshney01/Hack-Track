"use client";

import * as React from "react"
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

// function makeQueryClient() {
//   return new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: Infinity,
//       },
//     },
//   });
// }

// let browserQueryClient: QueryClient | undefined = undefined;

// function getQueryClient() {
//   if (typeof window === "undefined") {
//     // Server: always make a new query client
//     return makeQueryClient();
//   } else {
//     // Browser: make a new query client if we don't already have one
//     // This is very important so we don't re-make a new client if React
//     // suspends during the initial render. This may not be needed if we
//     // have a suspense boundary BELOW the creation of the query client
//     if (!browserQueryClient) browserQueryClient = makeQueryClient();
//     return browserQueryClient;
//   }
// }

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  // const queryClient = getQueryClient();

  return (
    // <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      // <ReactQueryDevtools initialIsOpen={false} />
    // </QueryClientProvider>
  );
}
