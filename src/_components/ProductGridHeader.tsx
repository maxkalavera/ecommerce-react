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
import { FaCaretDown, FaFilter, FaSort } from "react-icons/fa6";
import CategoriesRow from "@/components/CategoriesRow";
import ProductFilters from "./ProductFilters";
import settings from "@/settings";


const ProductGridHeader = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {}
>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const [activeTab, setActiveTab] = React.useState<string>("");

  const sortArray = [
    "Releveance",
    "Trending",
    "Latest arrival",
    "Price: Low to high",
    "Price: High to low",
  ]

  return (
    <Tabs 
      {...props}
      ref={forwardedRef}
      value={activeTab}
      onValueChange={setActiveTab}
      data-label="search-filters-tabs"
      className={cn(
        "relative",
        className,
      )}
    >
      <TabsList className="w-full h-fit flex-row justify-start items-end gap-2 bg-transparent">
        <div
          className="w-full flex flex-row justify-start items-start gap-2"
        >
          {settings.categories.tabs.map(item => (
            <Button
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
              >
                Sort <FaSort />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                "fit-fit fit-content",
                "flex flex-col justify-start items-center gap-0"
              )}
            >
              {sortArray.map((item, index) => (
                <Button
                  key={index} 
                  variant="link"
                  className="font-semibold"
                  size="default"
                >
                  {item}
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
              <ProductFilters 
              
              />
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

ProductGridHeader.displayName = "ProductGridHeader";

export default ProductGridHeader;