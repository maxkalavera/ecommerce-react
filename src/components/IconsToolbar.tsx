"use client"
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { FaCartShopping, FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import { useGlobalDialog } from "@/providers/GlobalDialogProvider";
import { ForSmallScreens } from "@/layouts/screens";
import Sidebar from "./Sidebar";
import ButtonLink from "@/wrappers/ButtonLink";


const IconsToolbar = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & { a: number }
>((
  {
    ...props
  }, 
  forwardedRef
) => {
  const { openDialog } = useGlobalDialog();

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "flex flex-row justify-start items-center",
        props.className
      )}
    >
      <Button
        variant="ghost"
        onClick={() => openDialog("search-dialog")}
      >
          <FaMagnifyingGlass />
      </Button>

      <ButtonLink href="/favorites">
        <FaHeart />
      </ButtonLink>

      <ButtonLink href="/cart">
        <FaCartShopping />
      </ButtonLink>

      <ForSmallScreens>
        <Sidebar />
      </ForSmallScreens>
    </div>
  )
});

IconsToolbar.displayName = "IconsToolbar";

export default IconsToolbar;