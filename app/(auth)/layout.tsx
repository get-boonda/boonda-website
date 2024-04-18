import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

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
      className="h-screen flex flex-col gap-8 items-center"
    >
      <div className="w-full flex flex-col flex-1">
        <Navbar variant="auth" />
        {children}
      </div>
      <Footer />
    </main>
  );
}
