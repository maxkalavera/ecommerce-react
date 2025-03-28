import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";


/******************************************************************************
 * Types
 */

export type BreadcrumbItems = ({ content: string, href: string })[];

/******************************************************************************
 * Main Component
 */
const BreadcrumbNavigation = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    items: BreadcrumbItems;
  }
>((
  {
    items=[],
    ...props
  }, 
  forwardedRef
) => {
  return (
    <Breadcrumb
      {...props}
      ref={forwardedRef}
    >
      <BreadcrumbList className="gap-1 sm:gap-1">
        <BreadcrumbItem>
          <BreadcrumbLink href="/shop" className="text-sm">Shop</BreadcrumbLink>
        </BreadcrumbItem>
        {items.length > 0 && <BreadcrumbSeparator />}

        {items.map(({ content, href }: BreadcrumbItems[number], index: number) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={href} className="text-sm">
                {content}
              </BreadcrumbLink>
            </BreadcrumbItem>

            {(items.length - 1) > index && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
});

BreadcrumbNavigation.displayName = "BreadcrumbNavigation";

export default BreadcrumbNavigation;