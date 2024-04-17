import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TanStackQueryProvider } from '@/providers/tanstack-query-provider';
import { Toaster } from '@/components/ui/sonner';
import { DEFAULT_URL } from '@/lib/constants';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          'min-h-screen dark bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <TanStackQueryProvider>
          {children}
          <Toaster />
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
