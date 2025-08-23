"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { useCategoriesQuery } from "@/hooks/queries/categories";
import { Category as CategoryType } from "@/types/categories";
import HorizontalScrollArea from "@/wrappers/HorizontalScrollArea";
import Category from "@/components/Category";
import Link from "@/wrappers/Link";


const CategoriesFlow: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    rootCategoryKey?: string;
  }
> = ({
  rootCategoryKey="",
  ...props
}) => {
  const categoriesQuery = useCategoriesQuery({ childrenOf: rootCategoryKey });

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
        { (categoriesQuery.payload.items || []).map((category: CategoryType) => (
          <div
            key={category.key}
            className="w-[150px] sm:w-[200px]"
          >
            <Link 
              href={`/shop?category=${category.key}`}
            >
              <Category
                key={category.key} 
                className="w-[150px] sm:w-[200px]"
                category={category}
                hoverable={true}
              />
            </Link>
          </div>
        ))}
      </HorizontalScrollArea>
    </div>
  )
};

CategoriesFlow.displayName = "CategoriesFlow";

export default CategoriesFlow;