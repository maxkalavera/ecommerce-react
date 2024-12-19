"use client"
import { cn } from "@/lib/utils";
import { Category as CategoryType } from "@/types/types";
import Image from "next/image";
import React, { } from "react";
import CategoryEmpty from "@/assets/category_empty.jpg"

// Sizes of component in REM size
const sizesMap: {[key: string]: {width: number, height: number}} = {
  "sm": {width: 6, height: 5},
  "md": {width: 12, height: 10},
  "lg": {width: 16, height: 12},
}

type Size = "sm" | "md" | "lg";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {
  category: CategoryType,
  hoverable: boolean,
  size: Size
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Category = React.forwardRef<HTMLDivElement, Props>((
  {
    category,
    hoverable,
    size="sm",
    ...props
  }, 
  forwardedRef
) => {
  
  const { width, height } = {
    width: (sizesMap[size as Size].width || 0) * 16,
    height: (sizesMap[size as Size].height || 0) * 16,
  };

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "relative min-w-24 min-h-20",
        "rounded-md overflow-clip select-none cursor-pointer",
        hoverable && "hover:outline hover:outline-2 hover:outline-primary",
      )}
      style={{
        width: width,
        height: height,
      }}
    >
      <Image 
        src={category.picture || CategoryEmpty}
        alt="Category's picture"
        width={width}
        height={height}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div
        className="w-fit max-w-full absolute z-10 bottom-2 left-0 right-0 m-auto px-4 py-1 rounded-sm bg-white/55"      
      >
        <h4 className="text-xs text-center font-bold">  
          {category.name}
        </h4>
      </div>
    </div>
  )
});

Category.displayName = "Category";

export default Category;