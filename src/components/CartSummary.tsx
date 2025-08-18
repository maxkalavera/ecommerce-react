import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


/************************************************************
 * Main component
 */

const CartSummary = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & { }
>((
  {
    ...props
  }, 
  forwardedRef
) => {
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "min-w-[250px]",
        "flex flex-col justify-start items-stretch gap-6",
        props.className
      )}
    >
      <h3 className="w-full font-semibold text-xl">Total</h3>

      <Grid>
        <GridItem className="justify-self-start">Subtotal:</GridItem> 
        <GridItem className="justify-self-end">{`$95.00`}</GridItem>

        <GridItem className="justify-self-start">Taxes:</GridItem> 
        <GridItem className="justify-self-end">{`$8.55 (9.0%)`}</GridItem>

        <GridItem className="justify-self-start">Shipping:</GridItem> 
        <GridItem className="justify-self-end">{`Free`}</GridItem>

        <GridItem className="font-bold mt-5 justify-self-start">Order total:</GridItem> 
        <GridItem className="font-bold mt-5 justify-self-end">{`$103.55`}</GridItem>
      </Grid>

      <Button>
        Checkout
      </Button>
    </div>
  )
});

CartSummary.displayName = "CartSummary";

export default CartSummary;


/************************************************************
 * Secondary Components
 */

const Grid: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "grid grid-cols-2 gap-x-2 gap-y-1",
        props.className
      )}
    >
      {props.children}
    </div>
  )
};

const GridItem: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  return (
    <p
      {...props}
      className={cn(
        "min-w-fit w-fit",
        "text-base font-medium text-nowrap",
        props.className
      )}
    >
      {props.children}
    </p>
  )
};