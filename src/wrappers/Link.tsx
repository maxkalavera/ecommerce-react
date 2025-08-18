import React from "react";
import { cn } from "@/lib/utils";
import NextLink from "next/link";


const Link: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    href?: string;
  }
> = ({
  href="",
  children,
  ...props
}) => {

  return (
    <NextLink href={href} passHref>
      <span
        {...props}
        className={cn(
          props.className
        )}
      >
        {children}
      </span>
    </NextLink>
  );
};


Link.displayName = "Link";

export default Link;
