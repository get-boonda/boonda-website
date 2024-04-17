import { createClient } from '@/app/utils/supabase/server';
import { DEFAULT_URL } from '@/lib/constants';
import { AuthFormSchema } from '@/shared/validations/auth-form';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = AuthFormSchema.parse(body);

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.redirect(
      DEFAULT_URL + '/sign-in?message=Could not authenticate user',
      307
    );
  }

  return NextResponse.redirect(DEFAULT_URL + '/upload', 307);
}
