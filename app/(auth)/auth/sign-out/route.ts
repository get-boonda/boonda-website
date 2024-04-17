import { DEFAULT_URL } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  await supabase.auth.signOut();

  return NextResponse.redirect(DEFAULT_URL + '/sign-in');
}
