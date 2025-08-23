
"use client"
import React from "react";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductsFLowSort } from "@/types/products";
import { productsFlowSortAtom } from "@/atoms/products";


const SortingMenu: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  const sortingItems = [
    {
      label: "Releveance",
      value: "relevance",
    },
    {
      label: "Trending",
      value: "trending",
    },
    {
      label: "Latest arrival",
      value: "latest-arrival",
    },
    {
      label: "Price: Low to high",
      value: "price-low-high",
    },
    {
      label: "Price: High to low",
      value: "price-high-low",
    },
  ];

  const [sortBy, setSortBy] = useAtom(productsFlowSortAtom);

  const handleSortChange = (value: string) => {
    setSortBy({
      sortBy: value as ProductsFLowSort['sortBy'],
    });
  }

  const value = sortBy.sortBy;
  return (
    <div
      {...props}
      className={cn(
        "w-full h-fit",
        "flex flex-col justify-start items-center gap-0",
        props.className
      )}
    >
      {sortingItems.map((item) => (
        <Button
          key={item.value} 
          className="w-full select-none"
          variant={value === item.value ? "default" : "ghost"}
          size="default"
          onClick={() => handleSortChange(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
};

SortingMenu.displayName = "SortingMenu";

export default SortingMenu;