"use client";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { resetSession } from "@/features/auth/store/auth.slice";

export const SessionExpiredModal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isExpired = useAppSelector((state) => state.auth.sessionExpired);

  if (!isExpired) return null;

  const handleLogin = () => {
    dispatch(resetSession());
    router.push("/sign-in");
  }

  return (
    <AlertDialog open={isExpired} onOpenChange={handleLogin}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session Expired</AlertDialogTitle>
          <AlertDialogDescription>
            Your session has expired. Please log in again to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleLogin}>Login</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
