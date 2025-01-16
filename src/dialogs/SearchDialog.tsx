"use client"
import Category from "@/components/Category";
import HorizontalScrollArea from "@/components/HorizontalScrollArea";
import Product from "@/components/Product";
import SearchBar from "@/components/search/SearchBar";
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
import React from "react";
import { productsAtom } from "@/atoms/products";
import { useAtomValue } from "jotai";

const SearchDialog: DialogComponent = (
  props
) => {
  return (
    <Sheet
      {...props}
    >
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side="top" className="h-fit max-h-[100dvh]">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
          <SheetDescription>
          Search for a product, a category or a search term using a searchbar.
          </SheetDescription>
          <SearchDialogContent />
        </SheetHeader>
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
  const productsData = useAtomValue(productsAtom);

  const nextProducts = React.useCallback(() => {

  }, []);

  const [categories, setCategories] = React.useState([
    { name: "Outwear", id: 0 }, { name: "Office outfits", id: 1 }, { name: "Workout", id: 2 }])
  const [loadingCategories, setLoadingCategories] = React.useState(false);

  const nextCategories = React.useCallback(() => {
    setLoadingCategories(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp: any[] = [];
    for(let i = 0; i < 5; i++) {
      tmp.push({ name: `${categories.length + i}`, id: categories.length + i })
    }
    setCategories((prev) => prev.concat(tmp));
    setLoadingCategories(false);
  }, [categories]);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        props.className,
        "flex flex-col justify-start items-center gap-8"
      )}
    >
      <SearchBar className="w-full mt-4" />
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
          className="w-full"
          hasMore={true} 
          isLoading={loadingCategories} 
          next={nextCategories} 
        >
          { categories.map((category) => (
            <Category 
              key={category.id} 
              category={category}
              hoverable={true}
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
          className="w-full"
          hasMore={productsData.hasMore} 
          isLoading={productsData.loading} 
          next={nextProducts} 
        >
          { productsData.items.map((product) => (
            <Product 
              key={product.id} 
              product={product}
              size="sm"
            />
          ))}
        </HorizontalScrollArea>
      </div>
    </div>
  )
});

SearchDialogContent.displayName = "SearchDialogContent";