"use client"
import React from 'react';
import { useAtomValue } from "jotai";
import document from "@/layouts/document";
import MainLayout from "@/layouts/main";
import { cn } from "@/lib/utils";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { useCartItemsQuery } from "@/hooks/queries/carts";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useQueriesNotifyer } from "@/atoms/queries";


export default function Cart() {
  const cartItemsQuery = useCartItemsQuery();
  const { queries } = useQueriesNotifyer();

  React.useEffect(() => {
    cartItemsQuery.reset();
  }, [queries['useDeleteCartItemMutation']]);


  return (
    <MainLayout>
      <document.Section>
        <document.SectionTitle>Cart</document.SectionTitle>

        <document.SectionFrame
          className={cn(
            "w-full h-fit",
            "flex flex-row justify-start items-stretch gap-12"
          )}
        >
          <div
            className={cn(
              "w-full h-fit",
              "flex flex-col justify-start items-start gap-8"
            )}
          >
            {(cartItemsQuery.payload?.items ?? []).map((item) => ( 
              <CartItem 
                key={item.key}
                cartItem={item}
                className="w-fit"
              />
            ))}
            <div
              className={cn(
                "w-full",
                "flex flex-row items-center justify-center",
              )}
            >
              <InfiniteScroll 
                hasMore={cartItemsQuery.payload?.hasMore ?? false} 
                isLoading={cartItemsQuery.status === "loading"} 
                next={cartItemsQuery.loadMore} 
                threshold={1.0}
              >
                {(cartItemsQuery.payload?.hasMore ?? false) && <h1>Loading...</h1>}
              </InfiniteScroll>
            </div>
          </div>
          <div
            className={cn(
              "flex flex-col justify-start items-center gap-12"
            )}
          >
            <CartSummary className="sticky top-4" />
          </div>
        </document.SectionFrame>

      </document.Section>
    </MainLayout>
  );
};
