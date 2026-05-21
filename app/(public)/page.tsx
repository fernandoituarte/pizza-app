import { Button } from "@/shared/components/ui/button";
import heroImage from "@/public/hero-image.jpg";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <Image
        src={heroImage}
        alt="Hero image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
        <h1 className="font-headline text-6xl drop-shadow-lg md:text-8xl lg:text-9xl">
          Pizza Pronto
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90 drop-shadow-md md:text-xl">
          Authentic Italian pizza, crafted with passion and delivered to your
          door. Experience the taste of tradition.
        </p>
        <Button asChild size="lg" className="mt-8 font-headline text-xl">
          <Link href="/menu">Order now</Link>
        </Button>
      </div>
    </div>
  );
}
