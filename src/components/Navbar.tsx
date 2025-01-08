'use client'
import React, { ReactNode, useCallback } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavbarItem { 
  label: ReactNode, 
  href: string
};

const Navbar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items: NavbarItem[],
    onItemClick?: EventListener
    orientation?: "horizontal" | "vertical"
  }
>((
  {
    items,
    onItemClick=undefined,
    orientation="horizontal",
    ...props
  }, 
  forwardedRef
) => {
  const pathname = usePathname();

  const isUnderPath = useCallback((startsWithPath: string, className: string) => {
    // Checks if current path is a subpath of startsWithPath and returns given className
    const paths = pathname.toLowerCase().split("/").slice(1);
    const startsWithPaths = startsWithPath.toLowerCase().split("/").slice(1);
    return startsWithPaths.every((path, index) => path === paths[index]) ? className : "";
  }, [pathname]);

  return (
    <NavigationMenu
      {...props}
      ref={forwardedRef}
    >
      <NavigationMenuList
        className={cn(
          orientation === "vertical" && "flex-col gap-2"
        )}
      >
        {items.map((item: NavbarItem, index: number) => (
          <NavigationMenuItem key={index} onClick={onItemClick}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink 
                className={cn(
                  navigationMenuTriggerStyle(),
                  isUnderPath(item.href, "font-bold"),
                  orientation === "vertical" && "min-w-36"
                )}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
});

Navbar.displayName = "Navbar";

export default (props: any) => {
  return (
    <Navbar 
      {...props}
      items={[
        {
          label: "Home",
          href: "/"
        },
        {
          label: "Shop",
          href: "/shop"
        },
        {
          label: "Blog",
          href: "/#"
        },
        {
          label: "About",
          href: "/#"
        },
        {
          label: "Contact",
          href: "/#"
        }
      ]}
    />
  )
};