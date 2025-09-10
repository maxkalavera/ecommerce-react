import { cn } from "@/lib/utils";
import React from "react";
import Navbar from "@/components/Navbar";
import IconsToolbar from "@/components/IconsToolbar";
import { ForLargeScreens } from "@/layouts/screens";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ForSmallScreens } from "@/layouts/screens";
import Sidebar from "@/components/Sidebar";


const Header = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & { a: number }
>((
  {
    ...props
  }, 
  forwardedRef
) => {
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full h-fit",
        "flex flex-row justify-between items-center gap-8",
        "px-6 sm:px-8 py-4",
        props.className
      )}
    >
      <Link href="/" passHref>
        <span
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "px-4",
            "font-sans font-black text-3xl text-neutral-950"
          )}
        >
          Store
        </span>
      </Link>

      <ForLargeScreens>
        <Navbar />
      </ForLargeScreens>

      <div
        className="flex flex-row justify-start items-center gap-0"
      >
        <IconsToolbar />

        <ForSmallScreens>
          <Sidebar />
        </ForSmallScreens>
      </div>
    </div>
  )
});

Header.displayName = "Header";

export default Header;