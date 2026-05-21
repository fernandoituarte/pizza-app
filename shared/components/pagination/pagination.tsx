import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { Product } from "@/features/products/types";

export type PaginationProps = {
  currentPage?: number;
  hasMore?: boolean;
  totalPages?: number;
  totalItems?: number;
  items?: Product[];
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function Pagination({
  currentPage = 1,
  hasMore = false,
  totalPages = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {

  return (
    <div className="flex items-center justify-between px-4">
      {/* <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div> */}
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
        <Label htmlFor="rows-per-page" className="text-sm font-medium">
          Rows per page
        </Label>

        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger size="sm" className="w-20">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page info */}
      <div className="flex w-fit items-center justify-center text-sm font-medium">
        Page {currentPage} de {totalPages}
      </div>

      {/* Navigation */}
      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <IconChevronsLeft />
        </Button>

        <Button
          variant="outline"
          className="size-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IconChevronLeft />
        </Button>

        <Button
          variant="outline"
          className="size-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasMore}
        >
          <IconChevronRight />
        </Button>

        <Button
          variant="outline"
          className="hidden size-8 lg:flex"
          onClick={() => onPageChange(totalPages)}
          disabled={!hasMore}
        >
          <IconChevronsRight />
        </Button>
      </div>
      </div>
    </div>
  );
}
