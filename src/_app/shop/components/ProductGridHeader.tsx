"use client"

import React from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import settings from "@/settings";
import { FaCaretDown, FaFilter, FaSort } from "react-icons/fa6";
import { ShopFilters } from "@/types/shop";
import CategoriesRow from "./CategoriesRow";
import ProductFilters from "./ProductFilters";


const ProductsGridHeader = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & 
  Partial<ShopFilters> & 
  {}
>((
  {
    ...props
  }, 
  forwardedRef
) => {
  const [activeTab, setActiveTab] = React.useState<string>("");
  /*
  const { category } = shopProps as ShopProps;
  const rootCategory = category && settings.categories.tabs.find(
      tab => 
          category.hierarchy?.parents.some(parent => parent.key === tab.key) ||
          category.key === tab.key
  );
  const sortBy = settings.shopSortByOptions.find(item => item.key === shopProps.sortBy);
  */
 const rootCategory = undefined;

  return (
    <Tabs 
      {...props}
      ref={forwardedRef}
      value={activeTab}
      onValueChange={setActiveTab}
      data-label="search-filters-tabs"
      className={cn(
        "relative",
        props.className,
      )}
    >
      <TabsList className="w-full h-fit flex-row justify-start items-end gap-2 bg-transparent">
        <div
          className="w-full flex flex-row justify-start items-start gap-2"
        >
          {settings.categories.tabs.map(item => (
            <Button
              //className={
                //rootCategory && item.key === rootCategory.key ?
                //"border-2 border-neutral-500" : undefined
              //}
              key={item.key} 
              variant={activeTab === item.key ? "default" : "outline" }
              onClick={() => activeTab === item.key ? setActiveTab("") : setActiveTab(item.key)}
            >
              {item.name} <FaCaretDown />
            </Button>
          ))}
        </div>
        <div
          className="w-full flex flex-col justify-start items-end md:flex-row md:justify-end md:items-start gap-2"
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline"
                className={cn(
                  //sortBy && "border-2 border-neutral-500"
                )}
              >
                Sort <FaSort />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                "fit-fit fit-content",
                "flex flex-col justify-start items-center gap-0",
              )}
            >
              {settings.shopSortByOptions.map((option) => (
                <Button
                  key={option.key}
                  variant="link"
                  className={cn(
                    "font-semibold",
                    //sortBy && sortBy.key === option.key && "underline"
                  )}
                  size="default"
                >
                  {option.label}
                </Button>
              ))}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline"
              >
                Filter <FaFilter />
              </Button>
            </PopoverTrigger>
            <PopoverContent
            >
              <ProductFilters />
            </PopoverContent>
          </Popover>
        </div>

      </TabsList>

      {settings.categories.tabs.map(item => (
        <TabsContent
          key={item.key}
          value={item.key}
        >
          <CategoriesRow rootCategory={item.key} />
        </TabsContent>
      ))}
    </Tabs>
  )
});

ProductsGridHeader.displayName = "ProductsGridHeader";

export default ProductsGridHeader;