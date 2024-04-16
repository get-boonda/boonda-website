'use client';

import { useSignOut } from '@/hooks/use-sign-out';
import { Button } from './ui/button';

export function SignOutButton() {
  const { mutate: signOut } = useSignOut();

  return (
    <Button onClick={() => signOut()} variant="outline" size="sm">
      Sign out
    </Button>
  );
}
