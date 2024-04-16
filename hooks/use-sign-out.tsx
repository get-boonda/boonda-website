'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useSignOut() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['sign-out'],
    mutationFn: async () => {
      const response = await fetch('/auth/sign-out', {
        method: 'POST',
      });

      if (response.redirected) {
        router.push(response.url);
      }

      return null;
    },
  });
}
