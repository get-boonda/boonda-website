"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/hooks/use-session";
import Link from "next/link";

export type UnlockHigherLimitsProps = {};

export function UnlockHigherLimits({}: UnlockHigherLimitsProps) {
  const { data } = useSession();

  if (data) {
    return (
      <Card className="w-96 z-[1] relative bg-zinc-950/55 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Higher limits unlocked!</CardTitle>
          <CardDescription>
            You have unlocked higher limits. Thanks for signing up!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-xs text-muted-foreground"></span>
          <Button className="w-full" variant="outline">
            Sign out
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-96 z-[1] relative bg-zinc-950/55 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Unlock Higher limits</CardTitle>
        <CardDescription>
          Upload files up to 50MB by signing up for a free account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-xs text-muted-foreground"></span>
        <Link className="w-full" href="/sign-up">
          <Button className="w-full">Sign up</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
