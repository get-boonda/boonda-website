'use client';

import { useSession } from '@/hooks/use-session';
import { SignOutButton } from './sign-out-button';
import { Button } from './ui/button';
import Link from 'next/link';

export function NavbarAuthButton() {
  const { data: user } = useSession();

  return user ? (
    <div>
      <span className="mr-4">{user.email}</span>
      <SignOutButton />
    </div>
  ) : (
    <Button asChild size="sm">
      <Link href="/sign-in">Sign in</Link>
    </Button>
  );
}
