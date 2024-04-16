import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  await supabase.auth.signOut();
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;

  return NextResponse.redirect(origin + '/sign-in');
}
