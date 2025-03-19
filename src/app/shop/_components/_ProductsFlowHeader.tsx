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
//import CategoriesRow from "@/components/CategoriesRow";
import Filters from "./filters/Filters";
import settings from "@/settings";
import { useCategoriesQuery } from "@/hooks/queries/categories";
import { Category as CategoryType } from "@/types/categories";
import HorizontalScrollArea from "@/wrappers/HorizontalScrollArea";
import { ForLargeScreens, ForSmallScreens } from "@/layouts/screens";
import Category from "@/components/Category";

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
  React.ComponentPropsWithoutRef<React.ElementType> & {
    extraContent?: React.ReactNode;
  }
>((
  {
    className,
    extraContent=undefined,
    ...props
  }, 
  forwardedRef
) => {
  const [activeTab, setActiveTab] = React.useState<string>("");

  return (
    /***********************************************************************
      * The header is builded extending the utilities of this Tabs component
      * The tabs is used to split the list of categories in groups using
      * tabs to select each group.
      */
    <Tabs 
      {...props}
      ref={forwardedRef}
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn(
        "w-full h-fit relative",
        className,
      )}
    >
      <TabsList 
        className="w-full h-fit flex-row justify-start items-end gap-2 bg-transparent"
      >
        {/***********************************************************************
         * Tabs
         * The tabs are listed here and activated or deactivated manually to be
         * be abble to personalize the content of the tabs component
         */}
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

        {/***********************************************************************
         * Extra options buttons
         * This buttons are not part of the Tabs component but an extra features
         * not related in any way with the tabs content.
         */}
        <div
          className="w-full flex flex-row justify-end flex-wrap items-end gap-2"
        >
          {/***********************************************************************
           * Sort popover options
           */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline"
              >
                Sort <FaSort />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <SortingSelect />
            </PopoverContent>
          </Popover>
          {/***********************************************************************
           * Filter popover options
           */}
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
              <Filters />
            </PopoverContent>
          </Popover>
        </div>
      </TabsList>

      {/***********************************************************************
       * Filter buttons
       * This buttons are not part of the Tabs component but an extra features
       * not related in any way with the tabs content.
       */}
      {settings.categories.tabs.map(item => (
        <TabsContent
          key={item.key}
          value={item.key}
        >
          <CategoriesFlow rootCategoryKey={item.key} />
        </TabsContent>
      ))}
    </Tabs>
  )
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
        hasMore={props.hasMore} 
        isLoading={props.isLoading} 
        next={props.next} 
      >
        { (categoriesQuery.data.items || []).map((category: CategoryType) => (
          <React.Fragment key={category.id}>
            <ForSmallScreens>
              <Category 
                key={category.id} 
                category={category}
                hoverable={true}
                size="sm"
              />
            </ForSmallScreens>
            <ForLargeScreens>
              <Category 
                key={category.id} 
                category={category}
                hoverable={true}
                size="md"
              />
            </ForLargeScreens>
          </React.Fragment>
        ))}
      </HorizontalScrollArea>
    </div>
  )
};
