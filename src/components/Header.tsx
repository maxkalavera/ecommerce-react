import { cn } from "@/lib/utils";
import React from "react";
import Navbar from "@/components/Navbar";
import IconsToolbar from "@/components/IconsToolbar";
import { ForLargeScreens } from "@/layouts/screens";


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
        "px-6 md:px-8 py-4",
        props.className
      )}
    >
      <h1
        className="font-sans font-black text-3xl text-neutral-950"
      >
        Store
      </h1>

      <ForLargeScreens>
        <Navbar />
      </ForLargeScreens>

      <IconsToolbar />
    </div>
  )
});

Header.displayName = "Header";

export default Header;