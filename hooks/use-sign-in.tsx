'use client';

import { AuthFormSchema } from '@/shared/validations/auth-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export function useSignIn() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async ({ email, password }: z.infer<typeof AuthFormSchema>) => {
      const response = await fetch('/auth/sign-in', {
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
        const url = new URL(response.url);
        if (url.pathname === '/upload') {
          router.push('/upload');
        }
        message = url.searchParams.get('message');
      }

      return message;
    },
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['session'],
      });
    },
  });
}
