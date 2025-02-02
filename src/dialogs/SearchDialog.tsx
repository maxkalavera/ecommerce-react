"use client"
import Category from "@/components/Category";
import HorizontalScrollArea from "@/components/HorizontalScrollArea";
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
import { DialogComponent } from "@/types/types";
import { Category as CategoryType } from "@/types/categories";
import React, { useState } from "react";
import { productsAtom } from "@/atoms/products";
import { useAtomValue } from "jotai";
import { useCategoriesQuery } from "@/hooks/queries/categories";
import { useProductsQuery } from "@/hooks/queries/products";
import { Product as ProductType } from "@/types/products";
import { ScrollArea } from "@/components/ui/scroll-area";

const SearchDialog: DialogComponent = (
  props
) => {
  return (
    <Sheet
      {...props}
    >
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side="top" className="h-fit max-h-[100dvh] overflow-hidden">
        <ScrollArea className="h-full max-h-[100dvh] mt-4">
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
            <SheetDescription>
              Search for a product, a category or a search term using a searchbar.
            </SheetDescription>
            <SearchDialogContent />
          </SheetHeader>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
};

SearchDialog.displayName = "SearchDialog";

export default SearchDialog;

/******************************************************************************
 * Secondary components
 *****************************************************************************/

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
  const categoriesQuery = useCategoriesQuery({ searchTerm });
  const productsQuery = useProductsQuery({ searchTerm });

  const nextProducts = React.useCallback(() => {

  }, []);

  const nextCategories = React.useCallback(() => {

  }, []);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full max-w-[100dvw] flex flex-col justify-start items-center gap-8",
        props.className
      )}
    >
      <SearchBar 
        className="w-full mt-8"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div
        data-label="Category's search's response"
        className={cn(
          "w-full h-fit",
          "flex flex-col justify-start items-start gap-2",
        )}
      >
        <h4 className="text-base font-bold">
          Categories
        </h4>

        <HorizontalScrollArea
          className="w-full min-h-44"
          hasMore={false}
          isLoading={categoriesQuery.isLoading} 
          next={nextCategories} 
        >
          { categoriesQuery.data !== undefined && categoriesQuery.data.items.map((category) => (
            <Category 
              key={category.id} 
              category={category}
              hoverable={true}
              showParentLabel={true}
            />
          ))}
        </HorizontalScrollArea>
      </div>

      <div
        data-label="Product's search's response"
        className={cn(
          "w-full",
          "flex flex-col justify-start items-start gap-2",
        )}
      >
        <h4 className="text-base font-bold">
          Related
        </h4>

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
                  size="sm"
                />
              ))}
            </React.Fragment>
          ))}
        </HorizontalScrollArea>
      </div>
    </div>
  )
});

SearchDialogContent.displayName = "SearchDialogContent";