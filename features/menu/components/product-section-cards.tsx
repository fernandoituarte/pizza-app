"use client";

import { SkeletonCard } from "@/shared/components/skeleton/skeleton-card";
import { Product } from "@/features/products/types";
import { ProductCard } from "./product-card";

type ProductsProps = {
  items?: Product[];
  isLoading: boolean;
};

const SKELETON_COUNT = 8;

export function ProductSectionCards({ items, isLoading }: ProductsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-6 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {isLoading &&
        Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      {items &&
        items.length > 0 &&
        items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}