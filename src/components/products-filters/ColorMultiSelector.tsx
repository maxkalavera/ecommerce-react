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
    onSelectChange?: (selected: ItemValue[]) => void,
  }
>((
  {
    items,
    onSelectChange=() => null,
    ...props
  }, 
  forwardedRef
) => {
  const [selected, setSelected] = React.useState<Set<ItemValue>>(new Set());

  const select = React.useCallback((value: ItemValue) => {
    setSelected(prev => {
      const res = prev.has(value) ? 
        new Set(prev).difference(new Set([value])) : 
        new Set(prev).add(value)
      onSelectChange(Array.from(res));
      return res;
    });
  }, []);

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
            "w-5 h-5",
            "rounded-full cursor-pointer",
            selected.has(item['value']) && "outline outline-3 outline-neutral-500",
          )}
          style={{
            backgroundColor: item['color'],
          }}
          onClick={() => select(item['value'])}
        />
      ))}
    </div>
  )
});

ColorMultiSelector.displayName = "ColorMultiSelector";

export default ColorMultiSelector;