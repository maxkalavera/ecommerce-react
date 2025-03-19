import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";


type ItemValue = string | number;

type Item = {
  color: string, 
  value: ItemValue
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {
  items: Item[],
  onSelectChange?: (selected: ItemValue[]) => void,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ColorMultiSelector = React.forwardRef<HTMLDivElement, Props>((
  {
    items,
    onSelectChange=() => null,
    ...props
  }, 
  forwardedRef
) => {
  const [selected, setSelected] = useState<Set<ItemValue>>(new Set());

  const select = useCallback((value: ItemValue) => {
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