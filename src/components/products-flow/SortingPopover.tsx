"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FaSort } from "react-icons/fa6";
import SortingMenu from "@/components/products-flow/SortingMenu";

const SortingPopover: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          className={cn(
            "select-none", 
            props.className
          )}
        >
          Sort <FaSort />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <SortingMenu />
      </PopoverContent>
    </Popover>
  )
};

SortingPopover.displayName = "SortingPopover";

export default SortingPopover;