"use client";

import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import pizzaImage from "@/public/2179.jpg";
import { Badge } from "@/shared/components/ui/badge";
import { Product } from "@/features/products/types";
import { MenuDialog } from "./menu-dialog";

export function ProductCard({ product }: { product: Product }) {

  return (
    <div className="relative max-w-lg rounded-xl pt-0 shadow-lg">
      <div className="flex h-60 items-center justify-center">
        <Image
          src={product.imageUrl ? product.imageUrl : pizzaImage}
          width={400}
          height={400}
          alt="Shoes"
          className="h-full w-full object-cover rounded-t-xl"
        />
      </div>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-2">
            <p className="leading-6">
              The king, seeing how much happier his subjects were, realized the
              error of his ways and repealed the joke tax.
            </p>
            {product.tags && product.tags?.length > 0 && (
              <>
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </>
            )}
          </CardDescription>
        </CardHeader>

        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">{product.price}</span>
          </div>

          {/* Add to cart button */}
          <MenuDialog product={product} />
        </CardFooter>
      </Card>
    </div>
  );
}
