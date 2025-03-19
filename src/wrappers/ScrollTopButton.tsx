"use client"
import { cn } from "@/lib/utils";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowUp } from "react-icons/fa6";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {
  anchor?: "element" | "window"
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ScrollTopButton = React.forwardRef<HTMLDivElement, Props>((
  {
    children,
    className,
    anchor="element",
    ...props
  }, 
  forwardedRef
) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);

  const onScrollUp = useCallback(() => {
    if (containerRef.current && anchor === "element") {
      containerRef.current.scrollIntoView();
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

  }, [])

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        className,
      )}
    >
      {children}
      <Button
        ref={buttonRef}
        variant="secondary"
        className={cn(
          "fixed bottom-4 right-4",
          "bg-neutral-100 border-[1px] border-neutral-300 hover:bg-neutral-200 shadow-md z-50"
        )}
        onClick={onScrollUp}
      >
        <FaArrowUp/>
      </Button>
    </div>
  )
});

ScrollTopButton.displayName = "ScrollTopButton";

export default ScrollTopButton;