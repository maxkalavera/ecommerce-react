"use client"
import React from "react";
import lodash from "lodash";
import { useAtomValue } from "jotai";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FaFilter } from "react-icons/fa6";
import FiltersMenu from "@/components/products-flow/FiltersMenu";
import { productsFlowFiltersAtom, initialProductsFlowFilters } from "@/atoms/products";


const FilterPopover: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  const filters = useAtomValue(productsFlowFiltersAtom);

  const isFiltered = !lodash.isEqual(filters, initialProductsFlowFilters);
  return (
    <Popover
      {...props}
    >
      <PopoverTrigger asChild>
        <Button 
          variant={isFiltered ? "default" : "outline"}
          className={cn(
            "select-none", 
            props.className
          )}
        >
          Filter <FaFilter />
        </Button>
      </PopoverTrigger>
      <PopoverContent
      >
        <FiltersMenu />
      </PopoverContent>
    </Popover>
  )
};

FilterPopover.displayName = "FilterPopover";

export default FilterPopover;