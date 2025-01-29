'use client'

import React from 'react'
import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalDialogProvider } from "@/providers/GlobalDialogProvider";

export default function Providers({ children }: React.ComponentPropsWithoutRef<React.ElementType>) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ThemeProvider attribute="class">
          <GlobalDialogProvider>
              {children}
          </GlobalDialogProvider>
        </ThemeProvider>
      </JotaiProvider>
    </QueryClientProvider>
  )
}