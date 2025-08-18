import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const SizeSelector: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items: {
      value: string;
      label: string;
      quiet: boolean;
    }[];
    value: string | null;
    handleSelect: (value: string | null) => void;
  }
> = ({
  items,
  value,
  handleSelect,
  ...props
}) => {

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
          className={cn(
            "min-w-12",
            item.quiet ? "outline-dotted outline-1 opacity-50" : ""
          )}
          key={item.value}
          size="sm"
          variant={
            value === item.value ? "default" : "outline"
          }
          onClick={() => handleSelect(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

SizeSelector.displayName = "SizeSelector";

export default SizeSelector;