import { cn } from "@/lib/utils";
import React, { ReactNode, useCallback, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props<V=string | number, T={ label: ReactNode, value: V }> extends React.ComponentPropsWithoutRef<React.ElementType>  {
  items: T[],
  initial?: V | null,
  size?: "md" | "sm",
  onSelectChange?: (selected: V) => void,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ItemSelector = React.forwardRef<HTMLDivElement, Props>((
  {
    items,
    initial=null,
    size="md",
    onSelectChange=() => null,
    ...props
  }, 
  forwardedRef
) => {
  const [selected, setSelected] = useState<((typeof items)[number]['value']) | null>(
    items.find((item: (typeof items)[number]) => item.value === initial) || 
    (items[0] || {})['value'] || 
    null
  );

  const select = useCallback((value: string | number) => {
    setSelected(value);
    onSelectChange(items.find((item: (typeof items)[number]) => item.value === value));
  }, []);

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
      {items.map((item: (typeof items)[number], index: number) => (
        <div
          key={index}
          className={cn(
            "w-fit h-9 px-3 py-2",
            "rounded-sm border-solid border-[1px] border-neutral-300 dark:border-neutral-700",
            "font-sans text-sm cursor-pointer",
            selected === item['value'] && 
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

ItemSelector.displayName = "ItemSelector";

export default ItemSelector;