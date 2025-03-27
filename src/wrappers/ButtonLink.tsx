import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";


const ButtonLink: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    href?: string;
  }
> = ({
  children,
  href="",
  ...props
}) => {

  return (
    <Link href={href} legacyBehavior passHref>
      <a
        {...props}
        className={cn(
          buttonVariants({ variant: "ghost", size: "default" }),
          props.className
        )}
      >
        {children}
      </a>
    </Link>
  );
};


ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
