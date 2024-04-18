import { createClient } from '@/utils/supabase/client';
import { UserResponse } from '@supabase/supabase-js';

export async function getSessionServer() {
  const response = await fetch('/auth/session');
  const data = (await response.json()) as UserResponse;

  console.log({ data });

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.data.user;
}

export async function getSessionClient() {
  const supabase = createClient();

  const data = await supabase.auth.getUser();

  return data.data.user;
}
