import React from "react";
import { cn } from "@/lib/utils";
import ColorMultiSelector from "./ColorMultiSelector";
import ItemMultiSelector from "./ItemMultiSelector";
import RangePicker from "./RangePicker";
import { Button } from "@/components/ui/button";


const Filters = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<React.ElementType> & {}
>((
  {
    className,
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
        "flex flex-col justify-start items-start gap-6",
        className,
      )}
    >
      <div
        data-label="filter"
        className={cn(
          "flex flex-col justify-start items-start gap-2"
        )}
      >
        <h4 
          className="font-serif font-bold text-sm"
        >
          Color
        </h4>
        <ColorMultiSelector 
          items={[
            { color: "#dc2626", value: "0"},
            { color: "#ea580c", value: "1"},
            { color: "#65a30d", value: "2"},
            { color: "#0891b2", value: "3"},
          ]}
        />
      </div>

      <div
        data-label="filter"
        className={cn(
          "flex flex-col justify-start items-start gap-2"
        )}
      >
        <h4 
          className="font-serif font-bold text-sm"
        >
          Size
        </h4>
        <ItemMultiSelector 
          size="sm"
          items={[
            { label: "XS", value: "xs" },
            { label: "S", value: "s" },
            { label: "M", value: "m" },
            { label: "L", value: "l" },
            { label: "XL", value: "xl" },
            { label: "2XL", value: "2xl" },
            { label: "3XL", value: "3xl" },
            { label: "4XL", value: "4xl" },
          ]}
        />
      </div>
      <div
        data-label="filter"
        className={cn(
          "w-full flex flex-col justify-start items-start gap-2"
        )}
      >
        <h4 
          className="font-serif font-bold text-sm"
        >
          Price
        </h4>
        <RangePicker 
          
        />
      </div>
      <div
        className={cn(
          "w-full flex flex-row justify-between items-start gap-2"
        )}
      >
        <Button variant="secondary">Clear</Button>
        <Button variant="default">See results</Button>
      </div>
    </div>
  )
});

Filters.displayName = "Filters";

export default Filters;