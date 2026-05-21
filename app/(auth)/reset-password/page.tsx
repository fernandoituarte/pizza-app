"use client";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <ResetPasswordForm token={token} />;
}
