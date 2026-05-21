"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/features/user/hooks/use-session";
import { Spinner } from "@/shared/components/ui/spinner";

export function ProtectedWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isPending, userData } = useSession();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated, isPending, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
