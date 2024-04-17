'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { useSignIn } from '@/hooks/use-sign-in';
import { useSignUp } from '@/hooks/use-sign-up';
import { AuthFormSchema } from '@/shared/validations/auth-form';

type AuthFormProps = {
  message: string;
  intent: 'sign-in' | 'sign-up';
};

export function AuthForm({ message, intent }: AuthFormProps) {
  const { mutate: signIn, isPending: isSigningIn } = useSignIn();
  const { mutate: signUp, isPending: isSigningUp } = useSignUp();
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isSubmitting = isSigningIn || isSigningUp;

  function onSubmit(values: z.infer<typeof AuthFormSchema>) {
    if (intent === 'sign-up') {
      signUp({ email: values.email, password: values.password });

      return;
    }

    signIn({ email: values.email, password: values.password });
  }

  const title = intent === 'sign-in' ? 'Sign In' : 'Sign Up';
  const description =
    intent === 'sign-in'
      ? 'Sign in to your account right now.'
      : 'Create your account right now.';

  const accountHelperText =
    intent === 'sign-in'
      ? 'Don’t have an account?'
      : 'Already have an account?';

  const logMessage = intent === 'sign-in' ? 'Sign Up' : 'Sign In';
  const logMessageRedirectRoute =
    intent === 'sign-in' ? '/sign-up' : '/sign-in';

  return (
    <Card className="max-w-[516px] w-full relative bg-zinc-950">
      <div
        style={{
          background:
            'conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)',
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
                  {intent === 'sign-up' && (
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
