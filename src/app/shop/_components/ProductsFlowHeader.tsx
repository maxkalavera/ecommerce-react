"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FaCaretDown, FaFilter, FaSort } from "react-icons/fa6";
import Filters from "./filters/Filters";
import settings from "@/settings";
import { useCategoriesQuery } from "@/hooks/queries/categories";
import { Category as CategoryType } from "@/types/categories";
import HorizontalScrollArea from "@/wrappers/HorizontalScrollArea";
import Category from "@/components/Category";
import Link from "@/wrappers/Link";


/******************************************************************************
 * Constants
 */

const sortingOptions = [
  "Releveance",
  "Trending",
  "Latest arrival",
  "Price: Low to high",
  "Price: High to low",
];

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
          {settings.categories.tabs.map(item => (
            <Button
              key={item.key} 
              variant={activeTab === item.key ? "default" : "outline" }
              onClick={() => activeTab === item.key ? setActiveTab("") : setActiveTab(item.key || "")}
            >
              {item.name} <FaCaretDown />
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

const SortingSelect: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full h-fit",
        "flex flex-col justify-start items-center gap-0",
        props.className
      )}
    >
      {sortingOptions.map((item, index) => (
        <Button
          key={index} 
          variant="link"
          size="default"
        >
          {item}
        </Button>
      ))}
    </div>
  )
};

const CategoriesFlow: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    rootCategoryKey?: string;
  }
> = ({
  rootCategoryKey="",
  ...props
}) => {
  const categoriesQuery = useCategoriesQuery({ rootCategory: rootCategoryKey });

  return (
    <div
      {...props}
      className={cn(
       "flex flex-row justify-start items-start",
        props.className
      )}
    >
      <HorizontalScrollArea
        className="w-full gap-4"
        hasMore={undefined}
        isLoading={undefined}
        next={undefined}
      >
        { (categoriesQuery.data.items || []).map((category: CategoryType) => (
          
          <Link 
            key={category.key} 
            href={`/shop?category=${category.key}`}
          >
            <Category
              key={category.id} 
              className="w-[150px] sm:w-[200px]"
              category={category}
              hoverable={true}
            />
          </Link>
        ))}
      </HorizontalScrollArea>
    </div>
  )
};

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
          className={props.className}
        >
          Sort <FaSort />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <SortingSelect />
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
        >
          Filter <FaFilter />
        </Button>
      </PopoverTrigger>
      <PopoverContent
      >
        <Filters />
      </PopoverContent>
    </Popover>
  )
};
