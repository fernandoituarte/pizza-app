"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Spinner } from "@/shared/components/ui/spinner";
import { GoogleFill } from "@/shared/components/icons/GoogleFill";
import axios from "axios";
import { authService } from "@/features/auth/services/auth.service";
import { handleGoogleLogin } from "@/features/auth/lib/google-login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/features/auth/validations";

type LoginFormValues = z.input<typeof signInSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setError(null);

    try {
      await authService.login({
        email: values.email,
        password: values.password,
      });
      router.replace("/dashboard");
    } catch (cause) {
      if (axios.isAxiosError(cause)) {
        setError(cause.response?.data?.message ?? cause.message);
      } else {
        setError("Unable to sign in right now.");
      }
    }
  }

  function onGoogleLogin() {
    handleGoogleLogin();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Access your orders, account and dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Authentication failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email ? (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password ? (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">
            Forgot your password?{" "}
            <Link className="underline" href="/forgot-password">
              Reset it
            </Link>
          </p>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="size-5" /> : "Sign in"}
          </Button>
        </form>

        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={onGoogleLogin}
        >
          <GoogleFill />
          Continue with Google
        </Button>

        <p className="text-sm text-muted-foreground">
          No account yet?{" "}
          <Link className="underline" href="/sign-up">
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
