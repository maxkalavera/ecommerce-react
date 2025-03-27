import { cn } from "@/lib/utils";
import React from "react";
import Navbar from "@/components/Navbar";
import IconsToolbar from "@/components/IconsToolbar";
import { ForLargeScreens } from "@/layouts/screens";
import Link from "next/link";
import { buttonVariants } from "./ui/button";


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
      <Link href="/" legacyBehavior passHref>
        <a
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "px-4",
            "font-sans font-black text-3xl text-neutral-950"
          )}
        >
          Store
        </a>
      </Link>

      <ForLargeScreens>
        <Navbar />
      </ForLargeScreens>

      <IconsToolbar />
    </div>
  )
});

Header.displayName = "Header";

export default Header;