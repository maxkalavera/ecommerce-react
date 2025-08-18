import React from "react";
import { ResponsiveImageBox, ResponsiveImage } from "@/components/ResponsiveImage";
import { cn, toPartialUpperCase } from "@/lib/utils";
import { FaShirt } from "react-icons/fa6";


const ColorSelector: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items: {
      value: string; 
      label: string;
      color: string; // Hex value of color
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
        "flex flex-row justify-start items-start gap-sm",
        props.className
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "w-[100px] h-fit",
            "flex flex-col justify-start items-start gap-xs",
            "rounded-md pb-1 select-none",
            item.quiet ? "bg-neutral-100/50" : "",
            item.value === value ? 
              "border-[1px] border-neutral-500 shadow-md" :
              "hover:border-[1px] hover:border-neutral-400 hover:cursor-pointer",
          )}
          onClick={() => handleSelect(item.value)}
        >
          <ResponsiveImageBox
            ratio={2/3}
            className={cn(
             "w-full",
             item.quiet ? "blur-[1px]" : "",
             item.value === value ? "" : "",
            )}
          >
            <div
              className={cn(
                "relative",
                "w-full h-full",
                "flex flex-row justify-center items-center",
              )}
            >
              <FaShirt 
                className={cn(
                  "absolute z-10",
                  "w-12 h-12",
                  "saturate-60 brightness-110",
                )}
                style={{
                  color: item.color
                }}
              />
              <FaShirt 
                className={cn(
                  "absolute z-0",
                  "w-12 h-12",
                  "text-neutral-500/90",
                  "blur-[2px]",
                )}
              />
            </div>
          </ResponsiveImageBox>

          <h4
            className={cn(
              "w-full text-sm font-semibold text-neutral-900 text-center",
              item.quiet ? "blur-[1px]" : "",
            )}
          >
            {toPartialUpperCase(item.label)}
          </h4>
        </div>
      ))}
    </div>
  );
};

ColorSelector.displayName = "ColorSelector";

export default ColorSelector;