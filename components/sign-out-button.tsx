'use client';

import { useSignOut } from '@/hooks/use-sign-out';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

export function SignOutButton() {
  const { mutate: signOut } = useSignOut();

  return (
    <Button onClick={() => signOut()} variant="outline" size="sm">
      Sign out
      <ChevronRight className="size-4 ml-2" />
    </Button>
  );
}
