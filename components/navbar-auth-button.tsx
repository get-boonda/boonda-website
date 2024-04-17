'use client';

import { useSession } from '@/hooks/use-session';
import { SignOutButton } from './sign-out-button';
import { Button } from './ui/button';
import Link from 'next/link';

export function NavbarAuthButton() {
  const { data: user } = useSession();

  return user ? (
    <SignOutButton />
  ) : (
    <Button asChild size="sm">
      <Link href="/sign-in">Sign in</Link>
    </Button>
  );
}
