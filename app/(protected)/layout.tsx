import Header from "@/shared/components/layout/Header";
import { ProtectedWrapper } from "./protected-wrapper";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/sidebar/app-sidebar";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <main className="grow">
          <SidebarTrigger />
          <section className="container mx-auto px-4 py-10">
            <ProtectedWrapper>{children}</ProtectedWrapper>
          </section>
        </main>
      </SidebarProvider>
    </>
  );
}
