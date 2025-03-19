import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props<V=string | number, T={ color: string, value: V }> extends React.ComponentPropsWithoutRef<React.ElementType>  {
  items: T[],
  initial?: V | null,
  onSelectChange?: (selected: V) => void,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ColorSelector = React.forwardRef<HTMLDivElement, Props>((
  {
    items=[
      { color: "#dc2626", value: "#dc2626"},
      { color: "#ea580c", value: "#ea580c"},
      { color: "#65a30d", value: "#65a30d"},
      { color: "#0891b2", value: "#0891b2"},
    ],
    initial=0,
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
        "flex flex-row justify-start items-center gap-2 flex-wrap",
      )}
    >
      {items.map((item: (typeof items)[number], index: number) => (
        <span
          key={index}
          className={cn(
            "w-5 h-5",
            "rounded-full cursor-pointer",
            selected === item['value'] && "outline outline-3 outline-neutral-500",
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

ColorSelector.displayName = "ColorSelector";

export default ColorSelector;