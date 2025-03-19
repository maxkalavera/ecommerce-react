"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FaCartShopping, FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import { useGlobalDialog } from "@/providers/GlobalDialogProvider";
import { ForSmallScreens } from "@/layouts/screens";
import Sidebar from "./Sidebar";

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
      <Link href="/favorites" legacyBehavior passHref>
        <Button
          variant="ghost"
        >
          <FaHeart />
        </Button>
      </Link>
      <Link href="/cart" legacyBehavior passHref>
        <Button
          variant="ghost"
        >
          <FaCartShopping />
        </Button>
      </Link>
      <ForSmallScreens>
        <Sidebar />
      </ForSmallScreens>
    </div>
  )
});

IconsToolbar.displayName = "IconsToolbar";

export default IconsToolbar;