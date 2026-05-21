"use client";
import { useEffect } from "react";
import { attachRequestInterceptor } from "./request.interceptor";
import { attachResponseInterceptor } from "./response.interceptor";

let interceptorsAttached = false;

const attachInterceptorsOnce = () => {
  if (interceptorsAttached) return;
  attachRequestInterceptor();
  attachResponseInterceptor();
  interceptorsAttached = true;
};

attachInterceptorsOnce();

export function AxiosInterceptorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    attachInterceptorsOnce();
  }, []);

  return <>{children}</>;
}