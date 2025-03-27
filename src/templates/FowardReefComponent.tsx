import React from "react";
import { cn } from "@/lib/utils";

const Base = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & { }
>((
  {
    ...props
  }, 
  forwardedRef
) => {
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        props.className
      )}
    >
    </div>
  );
});

Base.displayName = "Base";

export default Base;