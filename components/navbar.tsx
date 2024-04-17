import Link from 'next/link';
import AuthButton from './AuthButton';
import { Logo } from './svgs/logo';

type NavbarProps = {
  variant?: 'default' | 'auth';
};

export function Navbar({ variant = 'default' }: NavbarProps) {
  return (
    <nav className="w-full backdrop-blur-3xl flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full container flex justify-between items-center p-3 text-sm">
        <Link href="/">
          <Logo className="fill-white size-8" />
        </Link>
        {variant === 'default' && <AuthButton />}
      </div>
    </nav>
  );
}
