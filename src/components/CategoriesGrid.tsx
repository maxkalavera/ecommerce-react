import React from "react";
import Category from "@/components/Category";
import { cn } from "@/lib/utils";
import { Category as CategoryType } from "@/types/categories";
import Link from "@/wrappers/Link";


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
          <Link
            key={category.key} 
            href={`/shop?category=${category.key}`}
          >
            <Category 
              category={category}
              hoverable={true}
              size="dynamic"
            />
          </Link>
        ))}
      </div>
    </div>
  )
});

CategoriesGrid.displayName = "CategoriesGrid";

export default CategoriesGrid;