import React, { useCallback, useEffect, useState } from "react";
import Category from "@/components/Category";
import { cn } from "@/lib/utils";
import InfiniteScroll from "./ui/infinite-scroll";
import HorizontalScrollArea from "./HorizontalScrollArea";
import { ForLargeScreens, ForSmallScreens } from "@/layouts/screens";
import { Category as CategoryType } from "@/types/types";
import { useCategoriesQuery } from "@/hooks/queries/categories";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoriesRow = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<React.ElementType> & {
    rootCategory: CategoryType
  }
>((
  {
    rootCategory,
    ...props
  }, 
  forwardedRef
) => {
  const categoriesQuery = useCategoriesQuery({ rootCategory: rootCategory || "" });

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "flex flex-row justify-start items-start",
        props.className,
      )}
    >
      <HorizontalScrollArea
        className="w-full gap-4"
        hasMore={props.hasMore} 
        isLoading={props.isLoading} 
        next={props.next} 
      >
        { (categoriesQuery.data || []).map((category: CategoryType) => (
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
});

CategoriesRow.displayName = "CategoriesRow";

export default CategoriesRow;