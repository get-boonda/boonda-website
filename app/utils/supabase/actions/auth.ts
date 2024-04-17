'use server';

import { DEFAULT_URL } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signIn = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/sign-in?message=Could not authenticate user');
  }

  return redirect('/upload');
};

export const signUp = async (formData: FormData) => {
  'use server';

  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${DEFAULT_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return redirect('/sign-up?message=Could not authenticate user');
  }

  return redirect('/sign-up?message=Check email to continue sign in process');
};
