import React from "react";
import { cn } from "@/lib/utils";
import { FaImage } from "react-icons/fa6";

const PlaceholderImage: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  return (
    <span
      {...props}
      className={cn(
        "absolute top-0 left-0 w-full h-full px-8 z-0",
        "flex flex-col justify-center items-center",
        props.className,
      )}
    > 
      <FaImage className="w-12 h-12 xl:w-18 xl:h-18 text-neutral-950/10" />
    </span>
  );
};

PlaceholderImage.displayName = "PlaceholderImage";

export default PlaceholderImage;
