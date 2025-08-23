"use client"
import { cn } from "@/lib/utils";
import React from "react";

/******************************************************************************
 * Types
 */
type ItemValue = string | number;

type Item = {
  label: string, 
  value: ItemValue
}

/******************************************************************************
 * Main Component
 */
const ItemMultiSelector = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items: Item[],
    selected?: ItemValue[],
    onSelectChange?: (selected: ItemValue[]) => void,
  }
>((
  {
    items,
    selected,
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
        "w-full h-fit",
        "flex flex-row justify-start items-center gap-2 flex-wrap",
        "select-none"
      )}
    >
      {items.map((item: Item) => (
        <div
          key={item['value']}
          className={cn(
            "w-9 h-9 px-2 py-2",
            "flex flex-row justify-center items-center",
            "rounded-sm border-solid border-[1px] border-neutral-300",
            "font-sans text-xs font-semibold text-neutral-700",
            "cursor-pointer",
            selectedSet.has(item['value']) && cn(
                "border-2 border-neutral-700"
            )

          )}
          onClick={() => {
            if (!selectedSet.has(item['value'])) {
              onSelectChange([...selected, item['value']]);
            } else {
              onSelectChange(selected.filter((v: ItemValue) => v !== item['value']));
            }
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
});

ItemMultiSelector.displayName = "ItemMultiSelector";

export default ItemMultiSelector;