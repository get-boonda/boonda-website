import { AuthForm } from '@/components/auth-form';
import { DEFAULT_URL, OG_IMAGE_URL } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: 'Boonda - Sign Up',
  description: 'Sign Up to unlock higher limits on Boonda.',
  icons: {
    icon: [
      {
        url: '/logo-white.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo-black.ico',
        media: '(prefers-color-scheme: light)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'boonda.app',
    title: 'Boonda - Sign Up',
    description: 'Sign Up to unlock higher limits on Boonda.',
    images: OG_IMAGE_URL,
  },
  openGraph: {
    type: 'website',
    title: 'Boonda - Sign Up',
    description: 'Sign Up to unlock higher limits on Boonda.',
    images: OG_IMAGE_URL,
  },
};

export default async function SignUp() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/upload');
  }

  return (
    <div className="flex w-full justify-center items-center">
      <AuthForm intent="sign-up" />
    </div>
  );
}
