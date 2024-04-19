"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useSignIn } from "@/hooks/use-sign-in";
import { useSignUp } from "@/hooks/use-sign-up";
import { AuthFormSchema } from "@/shared/validations/auth-form";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type AuthFormProps = {
  intent: "sign-in" | "sign-up" | "desktop-sign-in" | "desktop-sign-up";
};

export function AuthForm({ intent }: AuthFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const localPort = searchParams.get("port");
  const desktopSuccess = searchParams.get("desktop-success");
  const [message, setMessage] = useState<string | null>(null);
  const { mutateAsync: signIn, isPending: isSigningIn } = useSignIn();
  const { mutateAsync: signUp, isPending: isSigningUp } = useSignUp();
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!desktopSuccess || !router || !pathname) {
      return;
    }

    completeDesktopSignIn().then(() => {
      router.replace(pathname);
    });
  }, [desktopSuccess]);

  const isSubmitting = isSigningIn || isSigningUp;
  const isIntentToSignIn = intent === "sign-in" || intent === "desktop-sign-in";
  const isDesktopSignIn = intent === "desktop-sign-in";
  const isDesktopSignUp = intent === "desktop-sign-up";

  async function completeDesktopSignIn() {
    const supabase = createClient();

    const session = await supabase.auth.getSession();

    if (session.error || !session.data.session) {
      console.error(session.error?.message ?? "Couldn't get session");
      return;
    }

    const port = z.coerce.number().int().positive().parse(localPort);

    await fetch(`http://localhost:${port}/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: session.data.session?.access_token,
        refresh_token: session.data.session?.refresh_token,
      }),
    });

    setMessage("Check your desktop app!");
  }

  async function onSubmit(values: z.infer<typeof AuthFormSchema>) {
    if (intent === "sign-up" || intent === "desktop-sign-up") {
      const signUpResponse = await signUp({
        email: values.email,
        password: values.password,
        intent: intent,
      });

      setMessage(signUpResponse);
      return;
    }

    const signInResponse = await signIn({
      email: values.email,
      password: values.password,
      intent,
    });

    setMessage(signInResponse);
    completeDesktopSignIn();
  }

  const title = isIntentToSignIn ? "Sign In" : "Sign Up";
  const description = isIntentToSignIn
    ? "Sign in to your account right now."
    : "Create your account right now.";

  const accountHelperText = isIntentToSignIn
    ? "Don’t have an account?"
    : "Already have an account?";

  const logMessage = isIntentToSignIn ? "Sign Up" : "Sign In";
  const logMessageRedirectRoute = isDesktopSignIn
    ? "/desktop-sign-up"
    : isDesktopSignUp
    ? "/desktop-sign-in"
    : isIntentToSignIn
    ? "/sign-up"
    : "/sign-in";

  return (
    <Card className="max-w-[516px] w-full relative bg-zinc-950">
      <div
        style={{
          background:
            "conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)",
        }}
        className="blur-[160px] rounded-xl opacity-35 w-full h-full absolute inset-0 pointer-events-none"
      />
      <div className="absolute inset-0 bg-zinc-950/65 pointer-events-none backdrop-blur-sm rounded-xl"></div>
      <CardHeader className="z-[1] relative">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="z-[1] relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  {intent === "sign-up" && (
                    <FormDescription>
                      At least 2 characters long.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {message && (
              <p className="text-muted-foreground text-sm border p-2 rounded-sm border-border">
                {message}
              </p>
            )}
            <div>
              <Button asChild variant="link" className="p-0">
                <Link href={logMessageRedirectRoute}>
                  {accountHelperText} {logMessage}
                </Link>
              </Button>
              <div className="flex justify-end items-center">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader className="size-4 animate-spin mr-2" />
                  )}
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
