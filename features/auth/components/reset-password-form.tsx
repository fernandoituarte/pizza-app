"use client";

import { useState } from "react";
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
import axios from "axios";
import { authService } from "@/features/auth/services/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPasswordSchema } from "@/features/auth/validations";

type ResetPasswordFormValues = z.input<typeof resetPasswordSchema>;

export function ResetPasswordForm({ token }: { token: string | null }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const passwordMatchError =
    (errors as Record<string, { message?: string }>).confirmPassword?.message ??
    null;

  async function onSubmit(values: ResetPasswordFormValues) {
    setError(null);

    try {
      await authService.resetPassword({
        token: String(token ?? ""),
        password: values.password,
      });

      router.replace("/auth/login");
      router.refresh();
    } catch (cause) {
      if (axios.isAxiosError(cause)) {
        setError(cause.response?.data?.message ?? cause.message);
      } else {
        setError("Unable to reset password right now.");
      }
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your new password to reset your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Reset Password failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password ? (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Confirm Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword")}
            />
            {errors.newPassword ? (
              <p className="text-sm text-destructive">{errors.newPassword.message}</p>
            ) : null}
            {passwordMatchError ? (
              <p className="text-sm text-destructive">{passwordMatchError}</p>
            ) : null}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="size-5" /> : "Reset Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
