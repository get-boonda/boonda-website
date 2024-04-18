'use client';

import { useSession } from '@/hooks/use-session';
import { SignOutButton } from './sign-out-button';
import { Button } from './ui/button';
import Link from 'next/link';

export default function AuthButton() {
  const { data: user } = useSession();

  return user ? (
    <div className="flex items-center">
      <span className="mr-4 truncate w-full max-w-20 min-[420px]:max-w-full">
        {user.email}
      </span>
      <SignOutButton />
    </div>
  ) : (
    <Button asChild size="sm">
      <Link href="/sign-in">Sign in</Link>
    </Button>
  );
}
