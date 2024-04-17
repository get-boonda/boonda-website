'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useSession } from '@/hooks/use-session';

export function ShareNowButton() {
  const { data: user } = useSession();

  if (user) {
    return (
      <Button asChild>
        <Link href="/upload">
          Share now
          <ChevronRight className="size-4 ml-2" />
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link href="/sign-in">
        Start now
        <ChevronRight className="size-4 ml-2" />
      </Link>
    </Button>
  );
}
