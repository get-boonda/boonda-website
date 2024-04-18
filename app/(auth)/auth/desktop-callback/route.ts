import { DEFAULT_URL } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient();
    const response = await supabase.auth.exchangeCodeForSession(code);

    if (response.error) {
      return NextResponse.redirect(
        `${DEFAULT_URL}/sign-up?message=Could not authenticate user`,
        307
      );
    }

    return NextResponse.redirect(
      `${DEFAULT_URL}/desktop-sign-in?desktop-success=true`,
      307
    );
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(
    `${DEFAULT_URL}/desktop-sign-in?desktop-success=true`,
    307
  );
}
