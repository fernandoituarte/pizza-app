import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { QueryProvider } from "@/shared/store/QueryProvider";
import ReduxProvider from "@/shared/store/ReduxProvider";
import Script from "next/script";
import { SessionExpiredModal } from "@/shared/components/modals/session-expired-modal";
import { AxiosInterceptorProvider } from "@/shared/lib/api/interceptors/axios.interceptor";
export const metadata: Metadata = {
  title: "Pizza Pronto",
  description: "Authentic Italian pizza, crafted with passion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-body antialiased min-h-screen flex flex-col bg-background"
        )}
      >
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <ReduxProvider>
          <QueryProvider>
            <AxiosInterceptorProvider>
              {children}
              <SessionExpiredModal />
            </AxiosInterceptorProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
