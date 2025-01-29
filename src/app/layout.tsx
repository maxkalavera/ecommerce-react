import type { Metadata } from "next";
import { 
  Roboto as MainSans,
  Roboto_Serif as MainSerif,
} from 'next/font/google';
import "./globals.css";
import { cn } from "@/lib/utils";
import { GlobalDialogProvider } from "@/providers/GlobalDialogProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import Providers from "./providers";

const mainSans = MainSans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--main-sans",
  display: 'swap',
});

const mainSerif = MainSerif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--main-serif",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce's template using Nextjs and React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      className=""
      suppressHydrationWarning
    >
      <body
        className={cn(
          'max-w-[100dvw] min-h-[100dvh] antialiased',
          mainSans.variable, mainSerif.variable
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
