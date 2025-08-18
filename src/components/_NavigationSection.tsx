import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const style = {
  "button": cn(
    //"text-base font-thin",
    "border-[1px] border-neutral-500",
  )
};

const NavigationSection = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {}
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
        "flex flex-col justify-center items-center",
        props.className
      )}
    >
      <div
        className={cn(
          "w-fit h-fit",
          "grid grid-cols-2 sm:grid-cols-4 gap-4",
        )}
      >
        <Button size="lg" variant="outline" className={style.button}>Women</Button>
        <Button size="lg" variant="outline" className={style.button}>Men</Button>
        <Button size="lg" variant="outline" className={style.button}>New arrivals</Button>
        <Button size="lg" variant="outline" className={style.button}>Sale</Button>
      </div>
    </div>
  )
});

NavigationSection.displayName = "NavigationSection";

export default NavigationSection;