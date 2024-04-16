'use client';

import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const supabase = createClient();
      const data = await supabase.auth.getUser();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.data.user;
    },
  });
}
