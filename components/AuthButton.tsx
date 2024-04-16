import Link from 'next/link';
import { Button } from './ui/button';
import { SignOutButton } from './sign-out-button';
import { createClient } from '@/utils/supabase/server';

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <SignOutButton />
  ) : (
    <Button asChild size="sm">
      <Link href="/sign-in">Sign in</Link>
    </Button>
  );
}
