"use client"
import { cn } from "@/lib/utils";
import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from '@/types/navigation';
import settings from "@/settings";


/******************************************************************************
 * Components
 */
const Navbar = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items: NavigationItem[],
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
        {settings.content.navigation.map((item: NavigationItem, index: number) => (
          <NavigationMenuItem 
            key={index}
            className={cn(
              item.disabled && "hover:pointer-events-none"
            )}
          >
            <Link 
              href={item.href} 
              passHref
              className={cn(
                item.disabled && "pointer-events-none cursor-not-allowed",
              )}
            >
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  isUnderPath(item.href, "font-bold"),
                )}
                asChild={true}
              >
                <span 
                  className={cn(
                    item.disabled && "text-neutral-500/50",
                  )}
                >
                  {item.label}
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
});

Navbar.displayName = "Navbar";
export default Navbar;
