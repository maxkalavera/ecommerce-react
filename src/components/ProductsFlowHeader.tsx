"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaCaretDown } from "react-icons/fa6";
import settings from "@/settings";
import CategoriesFlow from "@/components/products-flow/CategoriesFlow";
import FilterPopover from "@/components/products-flow/FilterPopover";
import SortingPopover from "@/components/products-flow/SortingPopover";


/******************************************************************************
 * Main component
 */
const ProductsFlowHeader = React.forwardRef<
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

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full h-fit",
        className,
      )}
    >
      <div
        className={cn(
          "w-full h-fit",
          "flex flex-row justify-start items-end gap-2"
        )}
      >
        {/***********************************************************************
         * Tabs
         * The tabs are listed here and activated or deactivated manually to be
         * be abble to personalize the content of the tabs component
         */}
        <div
          className="flex-grow flex flex-row justify-start items-start gap-2"
        >
          {settings.content.shop.productsHeaderOptions.map(item => (
            <Button
              key={item.key} 
              className="select-none"
              variant={activeTab === item.key ? "default" : "outline" }
              onClick={() => activeTab === item.key ? setActiveTab("") : setActiveTab(item.key || "")}
            >
              {item.label} <FaCaretDown />
            </Button>
          ))}
        </div>

        {/***********************************************************************
         * Extra options buttons
         * This buttons are not part of the Tabs component but an extra features
         * not related in any way with the tabs content.
         */}
        <div
          className="flex-grow flex flex-row justify-end flex-wrap items-end gap-2"
        >
          <SortingPopover />
          <FilterPopover />
        </div>
      </div>

      {/***********************************************************************
       * When a category tab is clicked the related categries are shown here
       */}
      {activeTab && (
        <CategoriesFlow rootCategoryKey={activeTab} />
      )}

    </div>
  );
});

ProductsFlowHeader.displayName = "ProductsFlowHeader";

export default ProductsFlowHeader;

/******************************************************************************
 * Secondary components
 */
/*
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

const FilterPopover: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  return (
    <Popover
      {...props}
    >
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
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
*/
