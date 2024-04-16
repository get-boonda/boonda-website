import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TanStackQueryProvider } from '@/providers/tanstack-query-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
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
        <TanStackQueryProvider>{children}</TanStackQueryProvider>
      </body>
    </html>
  );
}
