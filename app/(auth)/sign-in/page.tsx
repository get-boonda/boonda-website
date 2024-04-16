import { SubmitButton } from './submit-button';
import { AuthForm } from '@/components/auth-form';

export default function SignIn({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex w-full justify-center items-center h-[calc(100vh-64px)]">
      <AuthForm intent="sign-in" message={searchParams.message} />
    </div>
  );
}
