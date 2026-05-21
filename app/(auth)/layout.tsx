import Header from "@/shared/components/layout/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="grow">
        <section className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
          {children}
        </section>
      </main>
    </>
  );
}
