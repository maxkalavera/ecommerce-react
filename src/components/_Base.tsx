import { cn } from "@/lib/utils";
import React from "react";

const Base = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {

  }
>((
  {
    className,
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
  )
});

Base.displayName = "Base";

export default Base;