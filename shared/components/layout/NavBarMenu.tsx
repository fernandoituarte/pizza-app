"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound, Menu, ShoppingCart } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useAppSelector } from "@/shared/hooks/redux-hooks";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { selectCartItemsCount } from "@/features/cart/store/cart.selectors";
import { authService } from "@/features/auth/services/auth.service";
import { useSession } from "@/features/user/hooks/use-session";

export function UserMenu() {
  const router = useRouter();
  const itemCount = useAppSelector(selectCartItemsCount);
  const { isAuthenticated } = useSession();
  const [cartOpen, setCartOpen] = useState(false);

  const handleSignOut = async () => {
    await authService.logout();
    router.refresh();
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Desktop logged out */}
      {!isAuthenticated && (
        <div className="hidden md:flex items-center space-x-2">
          <Button asChild variant="ghost">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}

      {/* Desktop logged in */}
      {isAuthenticated && (
        <Link
          href={"/dashboard"}
          className="hidden md:flex items-center space-x-1"
        >
          <span>
            <UserRound className="w-4.5" />
          </span>
        </Link>
      )}

      {/* Cart Button */}
      <Button
        variant="outline"
        className="relative border-none hidden md:flex"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />

        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {itemCount}
          </span>
        )}

        <span className="sr-only">Shopping Cart</span>
      </Button>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      {/* Mobile Menu */}
      <div className="flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex">
              <Menu />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem>
              <Link href={"/menu"} className="w-full h-full">
                Menu
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setCartOpen(true)}
              className="flex justify-between cursor-pointer"
            >
              <span>Cart</span>
              {itemCount > 0 && (
                <span className=" flex h-4 w-4 items-center justify-center rounded-4xl bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {isAuthenticated ? (
              <>
                <DropdownMenuItem>
                  <Link href="/dashboard" className="w-full">
                    Mon compte
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleSignOut}>
                  Log out
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>
                  <Link href="/sign-in" className="w-full">
                    Sign In
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/sign-up" className="w-full">
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
