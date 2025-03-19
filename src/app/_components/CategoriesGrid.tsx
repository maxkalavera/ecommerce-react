import React from "react";
import Category from "@/components/Category";
import { cn } from "@/lib/utils";
import { Category as CategoryType } from "@/types/categories";


const CategoriesGrid = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    categories: CategoryType[];
  }
>((
  {
    categories=[],
    ...props
  }, 
  forwardedRef
) => {

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "flex flex-row justify-start items-start",
        props.className,
      )}
    >
      <div
        className={cn(
          "w-full",
          "grid place-content-center grid-cols-1 xs:grid-cols-2 md:grid-cols-3",
          "gap-6"
        )}
      >
        { categories.map((category: CategoryType) => (
          <Category 
            key={category.id} 
            category={category}
            hoverable={true}
            size="dynamic"
          />
        ))}
      </div>
    </div>
  )
});

CategoriesGrid.displayName = "CategoriesGrid";

export default CategoriesGrid;