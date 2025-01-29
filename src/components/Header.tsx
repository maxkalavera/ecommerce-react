"use client"
import { cn } from "@/lib/utils";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Link from "next/link";
import { FaUser, FaCartShopping, FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ThemeButton from "./ThemesButton";
import { 
  ForLargeScreens, 
  ForSmallScreens 
} from "@/layouts/screens";
import {
  HamburguerMenu, 
  HamburguerMenuClose, 
  HamburguerMenuContent, 
  HamburguerMenuDescription, 
  HamburguerMenuFooter, 
  HamburguerMenuHeader, 
  HamburguerMenuTitle, 
  HamburguerMenuTrigger
} from "@/components/HamburguerMenu";
import SearchBar from "./SearchBar";
import { useGlobalDialog } from "@/providers/GlobalDialogProvider";

const Header = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {

  }
>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const { openDialog, closeDialog } = useGlobalDialog();
  const [isHamburguerMenuOpen, setIsHamburguerMenuOpen] = React.useState(false);

  const closeHamburguerMenu = useCallback(() => {
    setIsHamburguerMenuOpen(false);
  }, []);

  return (
    <header
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full h-fit",
        "flex flex-col justify-start items-stretch gap-0",
        className
      )}
    >
      <div
        data-label="upper-header-large-screens"
        className={cn(
          "w-full h-16 p-4",
          "flex flex-row justify-between items-center gap-2 lg:gap-4",
        )}
      >
        <Logo />
        <ForLargeScreens
          className="flex flex-row justify-between items-center gap-2 lg:gap-4"
        >
          <div
            data-label="center"
            className="flex flex-row justify-start items-center gap-1 md:gap-2 lg:gap-4"
          >
            <Navbar />
          </div>
          <div
            data-label="right"
            className="flex flex-row justify-start items-center gap-1 md:gap-2 lg:gap-4"
          >
            <div
              data-label="Icon buttons"
              className="flex flex-row justify-start items-center gap-1 md:gap-2 log:gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => openDialog("search-dialog")}
              >
                  <FaMagnifyingGlass />
              </Button>
              <Link href="/favorites" legacyBehavior passHref>
                <Button
                  variant="ghost"
                  size="sm"
                >
                  <FaHeart />
                </Button>
              </Link>
              <Link href="/cart" legacyBehavior passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={undefined}
                >
                  <FaCartShopping />
                </Button>
              </Link>
            </div>
            <Button
              disabled={true}
              variant="outline"
              size="sm"
            >
              <FaUser />
              <h4 className="text-sm">
                Sign in
              </h4>
            </Button>
          </div>
        </ForLargeScreens>
        <ForSmallScreens>
          <HamburguerMenu
            open={isHamburguerMenuOpen}
            onOpenChange={setIsHamburguerMenuOpen}
          >
            <HamburguerMenuTrigger />
            <HamburguerMenuContent>
              <HamburguerMenuHeader>
                <HamburguerMenuTitle></HamburguerMenuTitle>
                <HamburguerMenuDescription></HamburguerMenuDescription>

                <div
                  data-label="right"
                  className="w-full flex flex-col justify-center items-center gap-6"
                >
                  <SearchBar />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={closeHamburguerMenu}
                  >
                    <FaUser />
                    <h4 className="text-sm">Sign in</h4>
                  </Button>


                  <div
                    data-label="Icon buttons"
                    className="w-full flex flex-row justify-center items-center gap-2"
                  >
                    <Link href="/favorites" legacyBehavior passHref>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={closeHamburguerMenu}
                      >
                        <FaHeart />
                      </Button>
                    </Link>
                    <Link href="/cart" legacyBehavior passHref>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={closeHamburguerMenu}
                      >
                        <FaCartShopping />
                      </Button>
                    </Link>
                  </div>

                  <Navbar 
                    orientation="vertical"
                    onItemClick={closeHamburguerMenu}
                  />
                </div>


                <HamburguerMenuFooter>
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Select
                      disabled={true}
                      defaultValue="english"
                    >
                      <SelectTrigger 
                        className={cn(
                          "w-fit h-fit px-2 py-1",
                          "text-sm flex flex-row justify-center items-center gap-1 focus:ring-transparent select-none"
                        )}
                      >
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select 
                      disabled={true}
                      defaultValue="USD"
                    >
                      <SelectTrigger 
                        className={cn(
                          "w-fit h-fit px-2 py-1",
                          "text-sm flex flex-row justify-center items-center gap-1 focus:ring-transparent select-none"
                        )}
                      >
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="MXN">MXN</SelectItem>
                      </SelectContent>
                    </Select>
                    <ThemeButton />
                  </div>
                </HamburguerMenuFooter>

              </HamburguerMenuHeader>
            </HamburguerMenuContent>
          </HamburguerMenu>
        </ForSmallScreens>
      </div>

      <ForLargeScreens>
        <div
          data-label="upper-header-large-screens"
          className={cn(
            "w-full h-8 px-4 p-2",
            "flex flex-row justify-end items-center gap-4",
            "border-neutral-300 border-y-[1px] border-solid"
          )}
        >
          <div
            data-label="options"
            className="px-4 flex flex-row justify-end items-center gap-2"
          >
            <Select
              disabled={true}
              defaultValue="english"
            >
              <SelectTrigger 
                className={cn(
                  "w-fit h-fit px-2 py-1 border-none",
                  "text-sm flex flex-row justify-center items-center gap-1 focus:ring-transparent select-none"
                )}
              >
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>

            <Select
              disabled={true}
              defaultValue="USD"
            >
              <SelectTrigger 
                className={cn(
                  "w-fit h-fit px-2 py-1 border-none",
                  "text-sm flex flex-row justify-center items-center gap-1 focus:ring-transparent select-none"
                )}
              >
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="MXN">MXN</SelectItem>
              </SelectContent>
            </Select>
            <ThemeButton />
          </div>
        </div>
      </ForLargeScreens>

    </header>
  )
});

Header.displayName = "Header";

export default Header;

/****************************************************************************** 
 * Secondary Components
 *****************************************************************************/

const Logo = () => {
  return (
    <div
      data-label="left"
      className="flex flex-row justify-start items-center gap-4"
    >
      <Button
        data-label="Home button"
        variant="ghost"
        className="cursor-pointer"
        asChild
      >
        <h2
          className="font-bold text-xl uppercase select-none"
        >
          Store
        </h2>
      </Button>
    </div>
  );
}

/****************************************************************************** 
 * Utils
 *****************************************************************************/
