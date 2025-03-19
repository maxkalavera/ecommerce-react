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
    size?: "md" | "sm",
    onSelectChange?: (selected: ItemValue[]) => void,
  }
>((
  {
    items,
    size="md",
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

  React.useEffect(() => {

  }, [selected]);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-fit h-fit",
        "flex flex-row justify-start items-center gap-4 flex-wrap",
        size === "sm" && "gap-2",
      )}
    >
      {items.map((item: Item) => (
        <div
          key={item['value']}
          className={cn(
            "w-fit h-9 px-3 py-2",
            "rounded-sm border-solid border-[1px] border-neutral-300 dark:border-neutral-700",
            "font-sans text-sm cursor-pointer",
            selected.has(item['value']) && 
              "outline outline-3 outline-neutral-500",
            size === "md" && "h-9 px-3 py-2 text-sm",
            size === "sm" && "h-6 px-2 py-1 text-xs",
          )}
          onClick={() => select(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
});

ItemMultiSelector.displayName = "ItemMultiSelector";

export default ItemMultiSelector;