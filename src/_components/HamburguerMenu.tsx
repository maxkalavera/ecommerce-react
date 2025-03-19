"use client"
import React from "react";
import { cn } from '@/lib/utils';
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const HamburguerMenu: React.FC<React.ComponentPropsWithoutRef<typeof Sheet> & {}> = (
  {
    children,
    ...props
  }, 
) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet
      {...props}
      open={props.open || isOpen}
      onOpenChange={props.onOpenChange || ((value) => setIsOpen(value))}
    >
      {children}
    </Sheet>
  )
};
HamburguerMenu.displayName = "HamburguerMenu";

const HamburguerMenuTrigger = React.forwardRef<
  HTMLButtonElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {}
>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  return (
    <SheetTrigger
      {...props}
      ref={forwardedRef}
      className={cn(
        props.className
      )}
      asChild={true}
    >
      <Button
      
        variant='ghost'
        className={cn(
          "[&_svg]:size-5",
          props.className,
        )}        
      >
        <HamburgerMenuIcon />
      </Button>
    </SheetTrigger>
  )
});
HamburguerMenuTrigger.displayName = "HamburguerMenuTrigger";

const HamburguerMenuFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "absolute bottom-4 left-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
HamburguerMenuFooter.displayName = "HamburguerMenuFooter";

const HamburguerMenuContent = SheetContent;
HamburguerMenuContent.displayName = "HamburguerMenuContent"
const HamburguerMenuClose = SheetClose;
HamburguerMenuClose.displayName = "HamburguerMenuClose"
const HamburguerMenuHeader = SheetHeader;
HamburguerMenuHeader.displayName = "HamburguerMenuHeader"
const HamburguerMenuTitle = SheetTitle;
HamburguerMenuTitle.displayName = "HamburguerMenuTitle"
const HamburguerMenuDescription = SheetDescription;
HamburguerMenuDescription.displayName = "HamburguerMenuDescription"

export {
  HamburguerMenu,
  HamburguerMenuTrigger,
  HamburguerMenuContent,
  HamburguerMenuFooter,
  HamburguerMenuClose,
  HamburguerMenuHeader,
  HamburguerMenuTitle,
  HamburguerMenuDescription
};
