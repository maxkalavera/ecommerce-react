"use client"
import HorizontalScrollArea from "@/wrappers/HorizontalScrollArea";
import Product from "@/components/Product";
import SearchBar from "@/components/SearchBar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils";
import { DialogComponent } from "@/types/commons";
import React, { useState } from "react";
import { useProductsQuery } from "@/hooks/queries/products";
import { ScrollArea } from "@/components/ui/scroll-area";
import document from "@/layouts/document";


/******************************************************************************
 * Main Component
 */

const SearchDialog: DialogComponent = (
  props
) => {
  return (
    <Sheet
      {...props}
    >
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side="top" className="h-fit max-h-[100dvh] overflow-hidden">        
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <SearchDialogContent />
      </SheetContent>
    </Sheet>
  )
};

SearchDialog.displayName = "SearchDialog";

export default SearchDialog;

/******************************************************************************
 * Secondary components
 */

const SearchDialogContent = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {

  }
>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const productsQuery = useProductsQuery({ searchTerm });

  const nextProducts = React.useCallback(() => {

  }, []);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full max-w-[100dvw]",
        "flex flex-col justify-start items-center gap-8",
        props.className
      )}
    >
      <SearchBar 
        className="w-full mt-8"
        value={searchTerm}
        onChange={(event: any) => setSearchTerm(event.target.value)}
      />

      <document.Section>
        <document.SectionTitle className="w-full text-wrap">
          {searchTerm === '' ? "Products that might interest you" : "Related to your search"}
        </document.SectionTitle>
        <document.SectionFrame>
          <HorizontalScrollArea
            className="w-full min-h-80"
            hasMore={false} 
            isLoading={productsQuery.isLoading} 
            next={nextProducts} 
          >
            { productsQuery.data && productsQuery.data.pages.map((page, index) => (
              <React.Fragment key={index}>
                { page.items.map((product) => (
                  <Product 
                    key={product.id}
                    product={product}
                    className="w-[220px]"
                  />
                ))}
              </React.Fragment>
            ))}
          </HorizontalScrollArea>
        </document.SectionFrame>
      </document.Section>
    </div>
  )
});

SearchDialogContent.displayName = "SearchDialogContent";