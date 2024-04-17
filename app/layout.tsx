import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TanStackQueryProvider } from '@/providers/tanstack-query-provider';
import { Toaster } from '@/components/ui/sonner';
import { DEFAULT_URL } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
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

  queryClient.setQueryData(['session'], user);

  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          'min-h-screen dark bg-background font-sans antialiased',
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
