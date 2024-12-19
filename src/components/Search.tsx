'use client';
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/search/SearchBar";
import Category from "@/components/Category";
import HorizontalScrollArea from "./HorizontalScrollArea";
import Product from "./Product";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Search = React.forwardRef<HTMLButtonElement, Props>((
  {
    ...props
  }, 
  forwardedRef
) => {
  const [categories, setCategories] = useState([
    { name: "Outwear", id: 0 }, { name: "Office outfits", id: 1 }, { name: "Workout", id: 2 }])
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [products, setProducts] = useState([
    { name: "Shirt", id: 0, price: "300.00", label: { color: "red", content: "25% OFF" } }, { name: "Striped shirt", id: 1 }, { name: "Jeans", id: 2 }])
  const [loadingProducts, setLoadingProducts] = useState(false);

  const nextCategories = useCallback(() => {
    setLoadingCategories(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp: any[] = [];
    for(let i = 0; i < 5; i++) {
      tmp.push({ name: `${categories.length + i}`, id: categories.length + i })
    }
    setCategories((prev) => prev.concat(tmp));
    setLoadingCategories(false);
  }, [categories]);

  const nextProducts = useCallback(() => {
    setLoadingProducts(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp: any[] = [];
    for(let i = 0; i < 5; i++) {
      tmp.push({ name: `${products.length + i}`, id: products.length + i })
    }
    setProducts((prev) => prev.concat(tmp));
    setLoadingProducts(false);
  }, [products]);

  return (
    <Dialog
    >
      <DialogTrigger
        {...props}
        asChild
      >
        <Button
          ref={forwardedRef}
          variant="outline"
          size="sm"
        >
            <FaMagnifyingGlass />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "flex flex-col justify-start items-center gap-8"
        )}
      >
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Search for a product, a category or a search term using a searchbar.
          </DialogDescription>
        </VisuallyHidden.Root>

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
            Related to your search
          </h4>

          <HorizontalScrollArea
            className="w-full"
            hasMore={true} 
            isLoading={loadingProducts} 
            next={nextProducts} 
          >
            { products.map((product) => (
              <Product 
                key={product.id} 
                product={product}
                hoverable={true}
              />
            ))}
          </HorizontalScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
});

Search.displayName = "Search";

export default Search;