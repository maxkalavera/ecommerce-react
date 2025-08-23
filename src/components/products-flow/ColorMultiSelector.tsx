"use client"
import { cn } from "@/lib/utils";
import React from "react";


/******************************************************************************
 * Types
 */
type ItemValue = string | number;

type Item = {
  color: string, 
  value: ItemValue
}

/******************************************************************************
 * Main Component
 */
const ColorMultiSelector = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items: Item[],
    selected?: ItemValue[],
    onSelectChange?: (selected: ItemValue[]) => void,
  }
>((
  {
    items,
    selected=[],
    onSelectChange=() => null,
    ...props
  }, 
  forwardedRef
) => {
  
  const selectedSet = new Set(selected);
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-fit h-fit",
        "flex flex-row justify-start items-center gap-2 flex-wrap",
      )}
    >
      {items.map((item: Item) => (
        <span
          key={item['value']}
          className={cn(
            "w-7 h-7",
            "rounded-sm",
            "outline outline-1 outline-neutral-900/25",
            "cursor-pointer",
            selectedSet.has(item['value']) && "outline outline-3 outline-neutral-500",
          )}
          style={{
            backgroundColor: item['color'],
          }}
          onClick={() => {
            if (!selectedSet.has(item['value'])) {
              onSelectChange([...selected, item['value']]);
            } else {
              onSelectChange(selected.filter((v: ItemValue) => v !== item['value']));
            }
          }}
        />
      ))}
    </div>
  )
});

ColorMultiSelector.displayName = "ColorMultiSelector";

export default ColorMultiSelector;