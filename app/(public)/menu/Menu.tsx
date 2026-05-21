"use client";

import { Pagination } from "@/shared/components/pagination/pagination";
import { ProductSectionCards } from "@/features/menu/components/product-section-cards";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useGetAllCategories } from "@/features/categories/hooks/use-get-all-categories";
import { useGetAllProducts } from "@/features/products/hooks/use-get-all-products";
import { useState } from "react";

function Menu() {
  const [category, setCategory] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const offset = (page - 1) * pageSize;

  const { data, isLoading } = useGetAllProducts({ limit: pageSize, offset, category });
  const { data: categories, isLoading: isloadingCategories, error: categoriesError } = useGetAllCategories({ limit: 100, offset: 0 });
  
  return (
    <div className="flex flex-1 flex-col max-w-[1400px] mx-auto">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col @4xl/main:items-center gap-4 py-4 md:gap-6 md:py-6">
          <Tabs>
            <Label htmlFor="view-selector" className="sr-only">
              View
            </Label>

            {/* Mobile */}
            <Select>
              <SelectTrigger
                className="flex ml-4 w-fit @4xl/main:hidden"
                size="sm"
                id="view-selector"
              >
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories && categories.items.length > 0 && (
                  <SelectGroup>
                    {categories.items.map((cat) => {
                      return (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    )})}
                  </SelectGroup>
                )}
              </SelectContent>
            </Select>

            {/* Desktop */}
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/20 hidden **:data-[slot=badge]:size-5 bg-white/35 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
              {categories &&
                categories.items.length > 0 && !isloadingCategories &&
                categories.items.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    value={cat.name}
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
            </TabsList>
          </Tabs>

          {/* Product List */}
          <ProductSectionCards {...data} isLoading={isLoading} />
          <Pagination
            currentPage={data?.currentPage || page}
            totalPages={data?.totalPages || 1}
            hasMore={data?.hasMore || false}
            totalItems={data?.totalItems || 0}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPage(1); // reset page
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Menu;

