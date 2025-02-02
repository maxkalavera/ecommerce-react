"use client"
import { cn } from "@/lib/utils";
import { Product as ProductType } from "@/types/products";
import React, { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Product = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    product: ProductType,
    outlineOnHover?: boolean,
    enableFavoritesButton?: boolean,
    enableAddCartButton?: boolean,
    imageRatio?: number,
    size?: "sm" | "md" | "lg" | "dynamic"
  }
>((
  {
    product,
    outlineOnHover=false,
    enableFavoritesButton=false,
    hideFavoritesButton=false,
    enableAddCartButton=false,
    imageRatio=2/3,
    size="md",
    ...props
  }, 
  forwardedRef
) => {
  const [error, setError] = React.useState(false);
  const router = useRouter()

  const toggleIsFavorite = () => {

  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addCart = () => {

  }

  const dinamicStyle = React.useMemo(() => cn(
    ({
      sm: "w-36",
      md: "w-48",
      lg: "w-64",
      dynamic: "w-full"
    } as { [key: string]: string})[size],
  ), [size]);

  return (
    <div
      className={cn(
        dinamicStyle,
        "flex flex-col justify-start items-start gap-0",
      )}
    >
      <div
        {...props}
        ref={forwardedRef}
        className={cn(
          dinamicStyle,
          "group/product",
          "relative h-fit",
          "rounded-sm overflow-clip select-none cursor-pointer",
          outlineOnHover && "hover:outline hover:outline-[1px] hover:outline-primary/35",
          props.className,
        )}
        onClick={() => router.push(`/p/${product.id}`)}
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
              hideFavoritesButton && "hidden group-hover/product:inline-flex",
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

        <div className={cn(
          dinamicStyle,
          "pointer-events-none overflow-clip"
        )}>
          <AspectRatio
            className="select-none"
            ratio={imageRatio}
          >
            {product.display?.image && !error && (
              <Image 
                src={product.display?.image} 
                alt="Product's image" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn(
                  "object-cover",
                  "transition-transform duration-200 group-hover/product:scale-110"
                )}
                onError={() => setError(true)}
              />
            )}
          </AspectRatio>

          {(!product.display?.image || error) && (
            <div
              className={cn(
                "absolute top-0 left-0 w-full h-full px-8 z-0",
                "flex flex-col justify-center items-center",
                "border-[1px] border-neutral-200 dark:border-neutral-800"
              )}
            >
              <h3 className="font-serif text-xl text-neutral-950/30 text-wrap text-center">
                No image
              </h3>
            </div>
          )}
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