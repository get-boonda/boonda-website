import Link from 'next/link';
import AuthButton from './AuthButton';

type NavbarProps = {
  isSupabaseConnected?: boolean;
  variant?: 'default' | 'auth';
};

export function Navbar({
  isSupabaseConnected,
  variant = 'default',
}: NavbarProps) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link href="/">Boonda</Link>
        {isSupabaseConnected && variant !== 'auth' && <AuthButton />}
      </div>
    </nav>
  );
}
