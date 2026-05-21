import { Skeleton } from "../ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="relative max-w-lg rounded-xl pt-0 shadow-lg">
      {/* Image */}
      <div className="flex h-60 items-center justify-center">
        <Skeleton className="h-full w-full rounded-t-xl bg-primary/10 " />
      </div>

      {/* Button */}
      <Skeleton className="absolute top-4 right-4 h-8 w-8 rounded-full bg-primary/10 " />

      <div className="border-none p-6 pt-4 space-y-4">
        {/* Title */}
        <Skeleton className="h-5 w-2/3 bg-primary/10 " />

        {/* Badges */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 bg-primary/10 " />
          <Skeleton className="h-5 w-20 bg-primary/10 " />
        </div>

        <div className="flex justify-between gap-3 max-sm:flex-col max-sm:items-stretch pt-2">
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-10 bg-primary/10 " />
            <Skeleton className="h-6 w-20 bg-primary/10 " />
          </div>

          <Skeleton className="h-10 w-28 bg-primary/10 " />
        </div>
      </div>
    </div>
  );
}