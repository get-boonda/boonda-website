"use client";

import { useSignOut } from "@/hooks/use-sign-out";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export type SignOutButtonProps = {
  redirectToSignIn?: boolean;
  className?: string;
};

export function SignOutButton({
  redirectToSignIn,
  className,
}: SignOutButtonProps) {
  const { mutate: signOut } = useSignOut();

  return (
    <Button
      onClick={() => signOut(redirectToSignIn)}
      variant="outline"
      className={className}
      size="sm"
    >
      Sign out
      <ChevronRight className="size-4 ml-2" />
    </Button>
  );
}
