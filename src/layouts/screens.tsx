"use client"
import { cn } from "@/lib/utils";
import React from "react";

export const ForSmallScreens = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    breakpoint?: string,
  }
>((
  {
    className,
    children,
    ...props
  }, 
  forwardedRef
) => {

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        `md:hidden`,
        className
      )}
    >
      {children}
    </div>
  )
});

ForSmallScreens.displayName = "ForSmallScreens";


const DISPLAY_TYPES = [
  "block",
  "inline-block",
  "inline",
  "flex",
  "inline-flex",
  "table",
  "inline-table",
  "table-caption",
  "table-cell",
  "table-column",
  "table-column-group",
  "table-footer-group",
  "table-header-group",
  "table-row-group",
  "table-row",
  "flow-root",
  "grid",
  "inline-grid",
  "contents",
  "list-item"
];

const DISPLAY_REGEX = `(^|\\s)(${DISPLAY_TYPES.join("|")})(\\s|$)`;

export const ForLargeScreens = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    breakpoint?: string,
  }
>((
  {
    className,
    children,
    ...props
  }, 
  forwardedRef
) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const matchMedia = window.matchMedia("(min-width: 768px)");
    setShow(matchMedia.matches);
    const callback = function(matchMedia: MediaQueryListEvent) {
      setShow(matchMedia.matches);
    }
    matchMedia.addEventListener("change", callback);
    return () => {
      if (matchMedia) {
        matchMedia.removeEventListener("change", callback);
      }
    }
  }, []);

  const displayType = React.useMemo(() => {
    if (className) {
      const matches = className.match(new RegExp(DISPLAY_REGEX, "gi"));
      if (matches.length > 0) {
        return matches[matches.length - 1];
      }
    }
    return "block";
  }, [className]);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        className
      )}
      style={{
        display: !show ? "none" : displayType,
      }}
    >
      {children}
    </div>
  )
});

ForLargeScreens.displayName = "ForLargeScreens";