import { Navbar } from '@/components/navbar';

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
    <main
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% -15%,rgba(120,119,198,0.3),hsla(0,0%,100%,0))',
      }}
      className="min-h-screen flex flex-col items-center"
    >
      <Navbar variant="auth" />
      {children}
    </main>
  );
}
