"use client"
import { cn } from "@/lib/utils";
import { Product as ProductType } from "@/types/products";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PlaceholderImage from "@/components/PlaceholderImage";


const Product = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    product: ProductType;
    outlineOnHover?: boolean;
    enableFavoritesButton?: boolean;
    enableAddCartButton?: boolean;
    onHoverFavoritesButton?: boolean;
  }
>((
  {
    product,
    outlineOnHover=false,
    enableFavoritesButton=false,
    onHoverFavoritesButton=false,
    enableAddCartButton=false,
    ...props
  }, 
  forwardedRef
) => {
  const [error, setError] = React.useState(false);

  const toggleIsFavorite = () => {

  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addCart = () => {

  }
  
  const coverImage = (product.images as any[]).find(item => item.isCover) || null;
  return (
    <div
      className={cn(
        "w-full",
        "flex flex-col justify-start items-start gap-0",
        props.className,
      )}
    >
      <div
        {...props}
        ref={forwardedRef}
        className={cn(
          "w-full",
          "group/product",
          "relative h-fit",
          "rounded-md overflow-clip select-none cursor-pointer",
          outlineOnHover && "hover:outline hover:outline-[1px] hover:outline-primary/15",
        )}
      >
        {product.label && (
          <div 
            className={cn(
              "absolute left-0 top-2 z-10",
              "overflow-clip rounded-r-sm",
              "w-fit max-w-20 px-1 py-0.5",
            )}
            style={{
              backgroundColor: product.label.color || "white", 
            }}
          >
            <span className="font-bold text-xs text-white">
              {product.label.content}
            </span>
          </div>
        )}

        { enableFavoritesButton && (
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "absolute z-10 right-1 top-2 text-red-600",
              onHoverFavoritesButton && "hidden group-hover/product:inline-flex",
            )}
            onClick={() => toggleIsFavorite()}
          >
            {product.isFavorite ? (
              <FaHeart />
            ): (
              <FaRegHeart />
            )}
          </Button>
        )}

        <div 
          className={cn(
            "w-full",
            "pointer-events-none overflow-clip"
          )}
        >
          <AspectRatio
            className="select-none"
            ratio={2/3}
          >
            <>
              {coverImage !== null ? (
                <Image
                  src={coverImage.url}
                  alt="Product's image" 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    "object-cover",
                    "transition-transform duration-200 group-hover/product:scale-110"
                  )}
                  onError={() => setError(true)}
                />
              ) :  (
                <PlaceholderImage className="w-full h-full rounded-sm" />
              )}
            </>
          </AspectRatio>


        </div>

        <div
          className={cn(
            "w-full min-h-18 h-18 max-h-20 px-2 py-4 z-10 bg-white",
          )}    
        >
          <h4 className="px-1 w-fit text-sm text-wrap">  
            {product.name}
          </h4>
          { product.price && (
            <h4 className="px-1 w-fit text-sm font-bold">
            ${product.price}
            </h4>
          )}
        </div>
      </div>

      { enableAddCartButton && (
        <Button
          variant="default"
          className={cn(
            "w-full px-4",
            "outline outline-1 outline-neutral-300",
            "rounded-none rounded-b-sm"
          )}
        >
          <FaCartShopping />
          Add Cart
        </Button>
      )}
    </div>
  )
});

Product.displayName = "Product";

export default Product;