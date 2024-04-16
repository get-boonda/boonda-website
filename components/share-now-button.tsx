import { createClient } from '@/utils/supabase/server';
import { Button } from './ui/button';
import Link from 'next/link';

export async function ShareNowButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <Button asChild>
        <Link href="/upload">Share now</Link>
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link href="/login">Share now</Link>
    </Button>
  );
}
