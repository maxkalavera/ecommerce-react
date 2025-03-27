"use client"
import { cn } from "@/lib/utils";
import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";


/******************************************************************************
 * Types
 */
export interface NavbarItem { 
  label: React.ReactNode, 
  href: string
  disabled?: boolean,
};

/******************************************************************************
 * Components
 */
const Navbar = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items: NavbarItem[],
  }
>((
  {
    items,
    ...props
  }, 
  forwardedRef
) => {
  const pathname = usePathname();

  const isUnderPath = React.useCallback((startsWithPath: string, className: string) => {
    // Checks if current path is a subpath of startsWithPath and returns given className
    const paths = pathname.toLowerCase().split("/").slice(1);
    const startsWithPaths = startsWithPath.toLowerCase().split("/").slice(1);
    return startsWithPaths.every((path, index) => path === paths[index]) ? className : "";
  }, [pathname]);

  return (
    <NavigationMenu
      {...props}
      ref={forwardedRef}
      className={cn(
        props.className
      )}
    >
      <NavigationMenuList
        className="gap-2"
      >
        {items.map((item: NavbarItem, index: number) => (
          <NavigationMenuItem 
            key={index}
            className={cn(
              item.disabled && "hover:pointer-events-none"
            )}
          >
            <Link 
              href={item.href} 
              legacyBehavior 
              passHref
            >
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  isUnderPath(item.href, "font-bold"),
                  item.disabled && cn(
                    "text-neutral-300 dark:text-neutral-700",
                    "pointer-events-none"
                  )
                )}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
});

Navbar.displayName = "Navbar";


/******************************************************************************
 * Wrappers
 */

const NavbarWrapper = () => {
  return (
    <Navbar
      items={[
        {
          label: "Women",
          href: "/shop?category=YgMVlkiMSs"
        },
        {
          label: "Men",
          href: "/shop?category=rdvc3N3wO"
        },
        {
          label: "New Arrivas",
          href: "/#",
          disabled: true,
        },
        {
          label: "Sale",
          href: "/#",
          disabled: true,
        },
      ]}
    />
  )
};

export default NavbarWrapper;