"use client";

import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["sign-out"],
    mutationFn: async () => {
      const supabase = createClient();

      const result = await supabase.auth.signOut();

      if (result.error) {
        throw new Error(result.error.message);
      }

      //router.push('/sign-in');

      return null;
    },
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ["session"],
      });
    },
  });
}
