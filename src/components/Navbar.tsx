'use client'
import React, { useCallback } from "react";
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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navbar = React.forwardRef<HTMLDivElement, Props>((
  {
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
    <div
      {...props}
      ref={forwardedRef}
    >
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink 
                className={cn(
                  navigationMenuTriggerStyle(),
                  isUnderPath("/", "font-bold")
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/shop" legacyBehavior passHref>
              <NavigationMenuLink 
                className={cn(
                  navigationMenuTriggerStyle(),
                  isUnderPath("/shop", "font-bold")
                )}
              >
                Shop
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/#" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/#" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/#" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
});

Navbar.displayName = "Navbar";

export default Navbar;