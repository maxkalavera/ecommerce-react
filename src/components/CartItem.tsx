"use client"
import React from "react";
import lodash from 'lodash';
import { cn } from "@/lib/utils";
import { Product as ProductType } from "@/types/products";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import { NumberInput } from '@/components/ui/number-input';
import { CartItem as CartItemType } from "@/types/carts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUpdateCartItemMutation, useDeleteCartItemMutation } from "@/hooks/queries/carts";
import { useQueriesNotifyer } from "@/atoms/queries";


const item = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & { 
    cartItem: CartItemType;
  }
>((
  {
    cartItem,
    ...props
  }, 
  forwardedRef
) => {
  const updateCartItemMutation = useUpdateCartItemMutation();
  const deleteCartItemMutation = useDeleteCartItemMutation();
  const [quantity, setQuantity] = React.useState(cartItem.quantity);
  const coverImage = (cartItem.product.images as any[]).find(item => item.isCover) || null;
  const notifyQueries = useQueriesNotifyer();
  //const optimisticQuantity = React.useRef<number>(quantity);


  const handleUpdateCartItem = React.useCallback(
    lodash.debounce((cartKey: string, value: number) => {
      updateCartItemMutation.fetch([cartKey, value]);
    }, 500), 
    [updateCartItemMutation.fetch]
  );
  
  const handleDeleteCartItem = React.useCallback(
    lodash.throttle((cartKey: string) => {
      deleteCartItemMutation.fetch([cartKey]);
    }, 500), 
    [deleteCartItemMutation.fetch]
  );

  React.useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  React.useEffect(() => {
    if (updateCartItemMutation.status === "success") {
      setQuantity(updateCartItemMutation.payload.data.quantity);
    } else if (["error", "canceled", "timeout"].includes(updateCartItemMutation.status)) {
      console.error("Error updating cart item", updateCartItemMutation.error);
    }
  }, [updateCartItemMutation.status]);

  React.useEffect(() => {
    if (updateCartItemMutation.status === "success") {
      notifyQueries.refetch('useDeleteCartItemMutation');
    }
  }, [deleteCartItemMutation.status])

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
          {coverImage && (
            <Image 
              src={coverImage.url} 
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
        <h3 
          className="w-full text-neutral-950 text-xl font-semibold"
        >
          {cartItem.product.name}
          </h3>
        <div
          className={cn(
            "w-fit h-fit",
            "grid grid-cols-2 justify-start gap-2 gap-y-1",
            "text-sm text-neutral-700"
          )}
        >
          <p className="font-semibold">Size:</p> <p className="text-sm text-mono">Small</p>
          <p className="font-semibold">Color:</p> <p className="text-sm font-mono">White</p>
        </div>

        <div
          className={cn(
            "w-full h-fit",
            "flex flex-row justify-start items-center gap-4"
          )}
        >
          <h3 className="font-semibold text-base text-neutral-800">
            {`$${cartItem.unitPrice}`}
          </h3>

          <NumberInput
            value={quantity}
            disabled={updateCartItemMutation.status === "loading"}
            onValueChange={(value) => handleUpdateCartItem(cartItem.key, value as number)}
            min={1}
            max={100}
            className={cn(
              "mx-4",
            )}
          />
        </div>
        {/* Options */}
        <div className="w-full h-full flex flex-row justify-end items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="link"
                className="underline text-sm text-neutral-500 hover:text-neutral-950"
                //disabled={deleteCartItemMutation.status === "loading"}
              >
                Remove
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to remove this item?</AlertDialogTitle>
                <AlertDialogDescription>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  className={cn(
                    buttonVariants({
                      variant: "destructive",
                    })
                  )}
                  onClick={() => handleDeleteCartItem(cartItem.key)}
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>
    </div>
  )
});

item.displayName = "item";

export default item;