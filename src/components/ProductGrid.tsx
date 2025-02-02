"use client"
import { cn } from "@/lib/utils";
import React from "react";
import { useAtomValue } from "jotai";
import Product from "@/components/Product";
import ProductGridHeader from "@/components/ProductGridHeader";
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { productsAtom } from "@/atoms/products";
import { useProductsQuery } from "@/hooks/queries/products";

const ProductGrid = React.forwardRef<
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
  const productsQuery = useProductsQuery();

  const nextProducts = React.useCallback(() => {

  }, []);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "min-h-[148px]",
        "flex flex-col justify-start items-start gap-2",
        className,
      )}
    >
      <ProductGridHeader 
        className="w-full mb-4 bg-background z-30"
      />

      <InfiniteScroll 
        hasMore={false} 
        isLoading={productsQuery.isLoading} 
        next={nextProducts} 
        threshold={0.5}
      >
        <div
          className={cn(
            "w-full",
            "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3",
            "justify-start items-start gap-x-8 gap-y-8",
          )}
        >
          { productsQuery.data && productsQuery.data.pages.map((page, index) => (
            <React.Fragment key={index}>
              { page.items.map((product) => (
                <Product 
                  key={product.id}
                  product={product}
                  outlineOnHover={true}
                  enableFavoritesButton={true}
                  hideFavoritesButton={true}
                  size="dynamic"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        { false && ( // Has more
          <h1>Loading...</h1>
        )}
      </InfiniteScroll>
    </div>
  )
});

ProductGrid.displayName = "ProductGrid";

export default ProductGrid;