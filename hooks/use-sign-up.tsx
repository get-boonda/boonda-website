'use client';

import { AuthFormSchema } from '@/shared/validations/auth-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: async ({
      email,
      password,
      intent = 'sign-up',
    }: z.infer<typeof AuthFormSchema> & {
      intent?: 'desktop-sign-up' | 'sign-up';
    }) => {
      const response = await fetch(`/auth/sign-up?intent=${intent}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let message: string | null = null;

      if (response.redirected) {
        message = new URL(response.url).searchParams.get('message');
      }

      return message;
    },
  });
}
