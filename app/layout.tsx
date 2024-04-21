import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TanStackQueryProvider } from "@/providers/tanstack-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_URL, OG_IMAGE_URL } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const runtime = "edge";

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: "Boonda - Upload and Share Files",
  description: "The fastest way to upload and share your files.",
  icons: {
    icon: [
      {
        url: "/logo-white.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo-black.ico",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "boonda.app",
    title: "Boonda - Upload and Share Files",
    description: "The fastest way to upload and share your files.",
    images: [
      {
        url: OG_IMAGE_URL,
      },
    ],
  },
  openGraph: {
    type: "website",
    title: "Boonda - Upload and Share Files",
    description: "The fastest way to upload and share your files.",
    images: [
      {
        url: OG_IMAGE_URL,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const queryClient = new QueryClient();

  queryClient.setQueryData(["session"], user);

  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          "min-h-screen dark bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <TanStackQueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
            <Toaster />
          </HydrationBoundary>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
