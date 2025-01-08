"use client"
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const styles = {
  tabsTrigger: cn(
    "px-0 py-1",
    "flex flex-row justify-start items-center gap-1",
    "text-sm",
    "data-[state=active]:shadow-none data-[state=active]:font-bold data-[state=active]:underline focus:outline-none",
  ),
  tabContent: cn(

  ),
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SearchFilters = React.forwardRef<HTMLDivElement, Props>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const [tab, setTab] = useState("");

  const sortArray = [
    "Releveance",
    "Treanding",
    "Latest arrival",
    "Price: Low to high",
    "Price: High to low",
  ]

  return (
    <Tabs 
      {...props}
      ref={forwardedRef}
      value={tab}
      onValueChange={setTab}
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
          <Button
            variant={tab === "women" ? "default" : "outline" }
            onClick={() => tab === "women" ? setTab("") : setTab("women")}
          >
            Women <FaCaretDown />
          </Button>
          <Button
            variant={tab === "men" ? "default" : "outline" }
            onClick={() => tab === "men" ? setTab("") : setTab("men")}
          >
            Men <FaCaretDown />
          </Button>
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

      <TabsContent 
        value="women"
      >
        <CategoriesRow />
      </TabsContent>
      <TabsContent 
        value="men"
      >
        <CategoriesRow />
      </TabsContent>
    </Tabs>
  )
});

SearchFilters.displayName = "SearchFilters";

export default SearchFilters;