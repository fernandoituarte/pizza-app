"use client";

import Link from "next/link";

import { PizzaLogo } from "../icons/PizzaLogo";
import { UserMenu } from "./NavBarMenu";

function Header() {
  return (
    <header
      className={`
      } sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60`}
    >
      <div
        className={`container flex m-auto items-center justify-between w-full} px-3`}
        style={{ height: "var(--header-height)" }}
      >
        {/* Pizza Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <PizzaLogo />
          <span className={`font-headline text-2xl font-bold`}>
            Pizza Pronto
          </span>
        </Link>

        {/* Menu*/}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/menu" className="transition-colors hover:text-primary">
              Menu
            </Link>
          </nav>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
