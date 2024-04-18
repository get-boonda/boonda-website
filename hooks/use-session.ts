"use client";

import { getSessionClient } from "@/shared/get-session";
import { useQuery } from "@tanstack/react-query";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSessionClient,
  });
}
