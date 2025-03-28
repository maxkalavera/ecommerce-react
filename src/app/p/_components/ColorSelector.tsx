import React from "react";
import { ResponsiveImageBox, ResponsiveImage } from "@/components/ResponsiveImage";
import { cn, toPartialUpperCase } from "@/lib/utils";


const ColorSelector: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items?: { 
      key: string; 
      label: string;
      image: string; 
      href: string; 
    }[];
    initial?: string;
  }
> = ({
  items=[ 
    {
      key: "XvHjg9jxD",
      label: "White",
      image: "/static/products/XvHjg9jxD.jpg",
      href: "#"
    },
    {
      key: "9vGCaCo0Afi4z7P0FGGhB",
      label: "Black",
      image: "/static/products/9vGCaCo0Afi4z7P0FGGhB.jpg",
      href: "#"
    }
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
        "flex flex-row justify-start items-start gap-sm",
        props.className
      )}
    >
      {items.map(item => (
        <div
          key={item.key}
          className={cn(
            "w-[100px] h-fit",
            "flex flex-col justify-start items-start gap-xs",
            "rounded-md pb-1 select-none",
            item.key === selected ? 
              "border-[1px] border-neutral-600 shadow-md" :
              "hover:border-[1px] hover:border-neutral-400 hover:cursor-pointer",
          )}
          onClick={() => setSelected(item.key)}
        >
          <ResponsiveImageBox
            ratio={2/3}
            className="w-full"
          >
            <ResponsiveImage 
              className="rounded-sm"
              sizes="100px"
              src={item.image}
              alt="Alternative color for the product"
            />
          </ResponsiveImageBox>

          <h4
            className="w-full text-sm font-semibold text-neutral-900 text-center"
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