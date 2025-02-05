import React from "react";
import Category from "@/components/Category";
import { cn } from "@/lib/utils";
import HorizontalScrollArea from "@/components/HorizontalScrollArea";
import { ForLargeScreens, ForSmallScreens } from "@/layouts/screens";
import { Category as CategoryType } from "@/types/categories";
import { useCategoriesQuery } from "@/hooks/queries/categories";


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
});

CategoriesRow.displayName = "CategoriesRow";

export default CategoriesRow;