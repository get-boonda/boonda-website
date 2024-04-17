import { AuthForm } from '@/components/auth-form';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/upload');
  }

  return (
    <div className="flex w-full justify-center items-center flex-1">
      <AuthForm intent="sign-in" />
    </div>
  );
}
