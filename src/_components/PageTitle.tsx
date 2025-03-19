import { cn } from "@/lib/utils";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageTitle = React.forwardRef<HTMLDivElement, Props>((
  {
    children,
    className,
    ...props
  }, 
  forwardedRef
) => {
  return (
    <h1
      {...props}
      ref={forwardedRef}
      className={cn(
        "text-2xl font-bold font-sans",
        className,
      )}
    >
      {children}
    </h1>
  )
});

PageTitle.displayName = "PageTitle";

export default PageTitle;