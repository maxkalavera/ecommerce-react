import React from "react";
import { cn } from "@/lib/utils";
import { Product as ProductType } from "@/types/products";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {   
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Item = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & { 
    product: ProductType
  }
>((
  {
    product,
    ...props
  }, 
  forwardedRef
) => {
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full h-fit",
        "flex flex-row justify-start items-stretch gap-4 xs:gap-8",
        props.className
      )}
    >
      {/****************************************************************************************** 
       * Left block containing the image of the product
       */}
      <div 
        className={cn(
          "min-w-[80px] w-[150px] h-fit",
        )}
      >
        <AspectRatio
          className="select-none"
          ratio={2/3}
        >
          {product.display?.image && (
            <Image 
              src={product.display?.image} 
              alt="Product's image" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover rounded-md",
              )}
            />
          )}
        </AspectRatio>
      </div>
      {/****************************************************************************************** 
       * Right block containing the info
       */}
       <div
        className={cn(
          "w-full",
          "flex flex-col justify-start items-start gap-4"
        )}
       >
        <h3 className="w-full text-neutral-950 text-xl font-thin">{product.name}</h3>
        <div
          className={cn(
            "w-fit h-fit",
            "grid grid-cols-2 justify-start gap-2 gap-y-1",
            "text-sm text-neutral-700"
          )}
        >
          <p>Size:</p> <p>Small</p>
          <p>Color:</p> <p>White</p>
        </div>

        <div
          className={cn(
            "w-full h-fit",
            "flex flex-row justify-start items-center gap-4"
          )}
        >
          <h3 className="font-semibold text-base text-neutral-800">
            {`$${product.price}`}
          </h3>
          

          <Select
            defaultValue="1"
          >
            <SelectTrigger className="w-fit px-4">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array(5).fill(-1).map((_, index) => (
                <SelectItem key={index} value={`${index + 1}`}>{`${index + 1}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Options */}
        <div className="w-full h-full flex flex-row justify-end items-center gap-4">
          <Button 
            variant="link"
            className="underline text-sm text-neutral-500 hover:text-neutral-950"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
});

Item.displayName = "Item";

export default Item;