"use client"
import { cn } from "@/lib/utils";
import React from "react";
import Product from "@/components/Product";
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { useProductsQuery } from "@/hooks/queries/products";
import Link from "@/wrappers/Link";


const ProductsFlow = React.forwardRef<
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
          "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "justify-start items-start gap-x-4 gap-y-4",
          props.className,
        )}
      >
        { productsQuery.data && productsQuery.data.pages.map((page, index) => (
          <React.Fragment key={index}>
            { page.items.map((product) => (
              <Link
                key={product.key}
                href={`/p/${product.key}`}
              >
                <Product 
                  product={product}
                  outlineOnHover={true}
                  enableFavoritesButton={true}
                  onHoverFavoritesButton={true}
                />
              </Link>

            ))}
          </React.Fragment>
        ))}
      </div>
      { productsQuery.hasNextPage && productsQuery.isLoading && ( // Has more
        <h1>Loading...</h1>
      )}
    </InfiniteScroll>
  )
});

ProductsFlow.displayName = "ProductsFlow";

export default ProductsFlow;