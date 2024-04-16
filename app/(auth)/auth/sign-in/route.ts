import { createClient } from '@/app/utils/supabase/server';
import { AuthFormSchema } from '@/shared/validations/auth-form';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const { email, password } = AuthFormSchema.parse(body);

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.redirect(
      origin + '/sign-in?message=Could not authenticate user',
      307
    );
  }

  return NextResponse.redirect(origin + '/upload', 307);
}
