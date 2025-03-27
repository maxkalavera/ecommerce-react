import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const SizeSelector: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items?: {
      key: string;
      label: string;
      disabled: boolean;
    }[];
    initial?: string;
  }
> = ({
  items=[
    { key: "xs", label: "XS", disabled: false },
    { key: "s", label: "S", disabled: false },
    { key: "m", label: "M", disabled: true },
    { key: "l", label: "L", disabled: true },
    { key: "xl", label: "XL", disabled: false },
    { key: "2xl", label: "2XL", disabled: false },
  ],
  initial="",
  ...props
}) => {
  const [selected, setSelected] = React.useState(
    items.some(item => item.key === initial) ? 
      initial : (items.length > 0 ? items.at(0)?.key : "")
  );

  return (
    <div
      {...props}
      className={cn(
        "flex flex-row justify-start items-start gap-xs flex-wrap",
        props.className
      )}
    >
      {items.map((item) => (
        <Button
          className="min-w-12"
          key={item.key}
          size="sm"
          variant={
            selected === item.key ? "default" : "outline"
          }
          onClick={() => setSelected(item.key)}
          disabled={item.disabled}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

SizeSelector.displayName = "SizeSelector";

export default SizeSelector;