import { createClient } from '@/utils/supabase/server';
import { Button } from './ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export async function ShareNowButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
