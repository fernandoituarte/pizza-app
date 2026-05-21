"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useGetProductById } from "@/features/products/hooks/use-get-product-by-id";
import { useAppDispatch } from "@/shared/hooks/redux-hooks";
import { addItem } from "@/features/cart/store/cart.slice";

export default function ProductDetails() {
  const params = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductById(params.id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col max-w-[1200px] mx-auto px-4 py-10">
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-1 flex-col max-w-[1200px] mx-auto px-4 py-10">
        <p className="text-destructive">Product not found.</p>
      </div>
    );
  }

  function handleAddToCart() {
    if (!product) return;
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: 1,
        extras: [],
        removedIngredients: [],
      })
    );
  }

  return (
    <div className="flex flex-1 flex-col max-w-[1200px] mx-auto">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="mx-auto pt-6 md:pt-10 max-w-2xl lg:max-w-none">
          <Breadcrumb className="pl-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/menu">Menu</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-6 pt-5">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={500}
                className="rounded-xl px-1 w-full object-cover lg:max-w-lg mx-auto max-h-[500px]"
              />
            ) : (
              <div className="rounded-xl bg-muted w-full max-h-[500px] min-h-[300px] flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No image</span>
              </div>
            )}

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

              {product.description && (
                <p className="mt-6 text-base text-muted-foreground">
                  {product.description}
                </p>
              )}

              <div className="mt-6">
                <Accordion
                  collapsible
                  type="single"
                  className="w-full"
                  defaultValue="ingredients"
                >
                  {product.ingredients && product.ingredients.length > 0 && (
                    <AccordionItem value="ingredients">
                      <AccordionTrigger>Ingredients</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1">
                          {product.ingredients.map((ing) => (
                            <li key={ing.id}>{ing.name}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {product.extras && product.extras.length > 0 && (
                    <AccordionItem value="extras">
                      <AccordionTrigger>Add extras</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1">
                          {product.extras.map((extra) => (
                            <li key={extra.id}>
                              {extra.name} (+{extra.price.toFixed(2)}€)
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>

              <div className="mt-5 flex">
                <Button className="h-11 px-8 text-md" onClick={handleAddToCart}>
                  Add to cart ({product.price.toFixed(2)}€)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
