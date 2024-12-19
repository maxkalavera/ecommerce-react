import { cn } from "@/lib/utils";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageFrame = React.forwardRef<HTMLDivElement, Props>((
  {
    children,
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
        "w-full h-fit max-w-screen-lg p-4",
        className,
      )}
    >
      {children}
    </div>
  )
});

PageFrame.displayName = "PageFrame";

export default PageFrame;