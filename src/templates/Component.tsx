import React from "react";
import { cn } from "@/lib/utils";

const Base: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        props.className
      )}
    >
    </div>
  );
};

Base.displayName = "Base";

export default Base;
