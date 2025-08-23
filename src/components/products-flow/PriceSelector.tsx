import React from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider"


const PriceSelector: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items: number[];
    value: number | null;
    onChange: (value: number | null) => void;
  }
> = ({
  items,
  value,
  onChange,
  ...props
}) => {

  const itemsWithNull = [...items, null];
  const valueIndex = itemsWithNull.findIndex((item) => item === value);
  return (
    <div
      {...props}
      className={cn(
        "w-full",
        "flex flex-col justify-start items-center gap-2",
        "select-none",
        props.className
      )}
    >
      <h4 className="w-full text-left text-sm text-neutral-700">
        {(() => {
          if (value === null) {
            return "Any price";
          } else if (value === 0) {
            return "Free";
          }
          return `Anything under \$${value}`;
        })()}
      </h4>
      <Slider 
        className="w-full"
        value={[valueIndex]}
        onValueChange={(value: number[]) => {
          const changedValueIndex = value[0];
          onChange(itemsWithNull[changedValueIndex]);
        }}
        max={itemsWithNull.length - 1}
        min={0}
        step={1} 
      />
    </div>
  );
};

PriceSelector.displayName = "PriceSelector";

export default PriceSelector;
