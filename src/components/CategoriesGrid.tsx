import React, { useCallback, useEffect, useState } from "react";
import Category from "@/components/Category";
import { cn } from "@/lib/utils";
import { Category as CategoryType } from "@/types/types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {
  categories: CategoryType[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoriesGrid = React.forwardRef<HTMLDivElement, Props>((
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
          "grid place-content-center grid-cols-1 xs:grid-cols-2 md:grid-cols-2",
          "gap-6 md:gap-8"
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