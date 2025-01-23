"use client"
import { cn } from "@/lib/utils";
import { Category as CategoryType } from "@/types/types";
import Image from "next/image";
import React, { useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

type Size = "sm" | "md" | "lg";

const Category = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<React.ElementType> & {
    category: CategoryType,
    hoverable: boolean,
    imageRatio?: number,
    size: Size
  }
>((
  {
    category,
    hoverable,
    imageRatio=4/3,
    size="md",
    ...props
  }, 
  forwardedRef
) => {
  const [error, setError] = React.useState(false);

  const dinamicStyle = React.useMemo(() => cn(
    ({
      sm: "w-24",
      md: "w-48",
      lg: "w-64",
      dynamic: "w-full"
    } as { [key: string]: string})[size],
  ), [size]);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        dinamicStyle,
        "group/category",
        "relative min-w-24 min-h-20",
        "rounded-md overflow-clip select-none cursor-pointer",
        hoverable && "hover:outline hover:outline-[1px] hover:outline-primary/35",
        (!category.display?.image || error) && "outline outline-2 outline-neutral-200"
      )}
    >

      <div className={cn(
        dinamicStyle,
        "pointer-events-none"
      )}>
        <AspectRatio
          className="select-none"
          ratio={imageRatio}
        >
          {category.display?.image && !error && (
            <Image 
              src={category.display.image} 
              alt="Product's image" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover",
                "transition-transform duration-200 group-hover/category:scale-110"
              )}
              onError={() => setError(true)}
            />
          )}
        </AspectRatio>

        {(!category.display?.image || error) && (
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-full px-8",
              "flex flex-col justify-center items-center",
              "border-[1px] border-neutral-200 dark:border-neutral-800"
            )}
          >
            <h3 className="font-serif text-xl text-neutral-950/30 dark:text-foreground text-wrap text-center">
              No image
            </h3>
          </div>
        )}
      </div>

      <div
        className="w-fit max-w-full absolute z-10 bottom-4 left-0 right-0 m-auto px-4 py-2 rounded-sm bg-white/55"      
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