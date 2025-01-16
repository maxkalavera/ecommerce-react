"use client"
import { cn } from "@/lib/utils";
import { Category as CategoryType } from "@/types/types";
import Image from "next/image";
import React, { } from "react";
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
        hoverable && "hover:outline hover:outline-2 hover:outline-primary",
        !category.picture && "outline outline-2 outline-neutral-200"
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
          {category.picture && (
            <Image 
              src={category.picture} 
              alt="Product's image" 
              fill 
              className={cn(
                "object-cover",
                "transition-transform duration-200 group-hover/category:scale-110"
              )} 
            />
          )}
        </AspectRatio>

        {!category.picture && (
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-full px-8",
              "flex flex-col justify-center items-center"
            )}
          >
            <h3 className="font-serif text-xl text-neutral-950/30 text-wrap text-center">
              No image
            </h3>
          </div>
        )}
      </div>

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