import { createClient } from '@/app/utils/supabase/server';
import { DEFAULT_URL } from '@/lib/constants';
import { AuthFormSchema } from '@/shared/validations/auth-form';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = AuthFormSchema.parse(body);

  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${DEFAULT_URL}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(
      DEFAULT_URL + '/sign-up?message=Could not authenticate user',
      307
    );
  }

  return NextResponse.redirect(
    DEFAULT_URL + '/sign-up?message=Check email to continue sign in process',
    307
  );
}
