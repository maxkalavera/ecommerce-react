"use client"
import { cn } from "@/lib/utils";
import React from "react";
import Product from "@/components/Product";
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { useProductsQuery } from "@/hooks/queries/products";


const ProductsGrid = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType>
>((
  props, 
  forwardedRef
) => {
  const productsQuery = useProductsQuery();

  return (
    <InfiniteScroll 
      hasMore={false} 
      isLoading={productsQuery.isLoading} 
      next={productsQuery.fetchNextPage} 
      threshold={0.5}
    >
      <div
        {...props}
        ref={forwardedRef}
        className={cn(
          "w-full",
          "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3",
          "justify-start items-start gap-x-8 gap-y-8",
          props.className,
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
  )
});

ProductsGrid.displayName = "ProductsGrid";

export default ProductsGrid;