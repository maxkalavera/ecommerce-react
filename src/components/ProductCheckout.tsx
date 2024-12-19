import { cn } from "@/lib/utils";
import React from "react";
import { Product as ProductType } from "@/types/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image";
import ProductEmpty from "@/assets/product_empty.jpg";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa6";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {
  product: ProductType,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProductCheckout = React.forwardRef<HTMLDivElement, Props>((
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
        "w-full max-w-screen-sm",
        "flex flex-row justify-start items-start gap-4",
      )}
    >
      <div
        data-label="product-checkout-picture" 
        className="w-36 min-w-36 relative rounded-md overflow-clip pointer-events-none"
      >
        <AspectRatio
          className="select-none"
          ratio={1.0 / 1.0}
        >
          <Image 
            src={product.picture || ProductEmpty} 
            alt="Product's image" 
            fill 
            className="object-cover" 
          />
        </AspectRatio>
        {!product.picture && (
          <div
            className={cn(
              "absolute bottom-0 top-0 left-0 right-0 px-4",
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
        className={cn(
          "w-full px-4 py-2",
          "flex flex-col justify-start items-start gap-2",
        )}
      >

        <div
          data-label="header"
          className={cn(
            "w-full h-fit",
            "flex flex-row justify-start items-center"
          )}
        >
          <div 
            className={cn(
              "w-full",
              "flex flex-col justify-start items-start gap-0"
            )}
          >
            <h4 className="font-bold text-base text-neutral-900">{product.name}</h4>
            <h5 className="font-bold text-xs text-neutral-900">Black / XS</h5>
          </div>
          <Button
            className="text-red-600 hover:text-red-600"
            variant="ghost"
            size="sm"
          >
            <FaTrash />
          </Button>
        </div>
        <h4 className="font-bold text-base text-neutral-900">$ {product.price} USD</h4>
        <Select
          defaultValue="1"
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="1"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>
  )
});

ProductCheckout.displayName = "ProductCheckout";

export default ProductCheckout;