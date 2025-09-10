"use client"
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { FaCartShopping, FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import { useGlobalDialog } from "@/providers/GlobalDialogProvider";
import { ForSmallScreens } from "@/layouts/screens";
import Sidebar from "@/components/Sidebar";
import ButtonLink from "@/wrappers/ButtonLink";
import { useGetCartItemsCountQuery } from "@/hooks/queries/carts";
import { useQueriesNotifyer } from "@/atoms/queries";


const IconsToolbar = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & { a: number }
>((
  {
    ...props
  }, 
  forwardedRef
) => {
  const cartsItemsCountQuery = useGetCartItemsCountQuery();
  const { openDialog } = useGlobalDialog();
  const { queries } = useQueriesNotifyer();

  React.useEffect(() => {
    cartsItemsCountQuery.reset();
  }, [queries['useGetCartItemsCount']]);

  const cartItemsCount = cartsItemsCountQuery.payload?.data?.count ?? 0;
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "flex flex-row justify-start items-center gap-0",
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

      <ButtonLink 
        href="/cart"
      >
        <div
          className="relative"
        >
          <FaCartShopping />
          <div
            className={cn(
              cartItemsCount === 0 ? "hidden" : "flex",
              "flex-row flex-items-center justify-center",
              "text-xs font-sans",
              "absolute -bottom-2/3 -right-2/3",
              "bg-red-500 text-white",
              "w-4 h-4",
              "rounded-full",
            )}
          >
            {cartItemsCount}
          </div>
        </div>
      </ButtonLink>
    </div>
  )
});

IconsToolbar.displayName = "IconsToolbar";

export default IconsToolbar;