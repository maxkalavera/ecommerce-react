"use client"
import { cn } from "@/lib/utils";
import React from "react";
import { useAtomValue } from "jotai";
import { FaCircleExclamation } from 'react-icons/fa6';
import Product from "@/components/Product";
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { useProductsQuery } from "@/hooks/queries/products";
import Link from "@/wrappers/Link";
import { Category } from "@/types/categories";
import { productsFlowFiltersAtom, productsFlowSortAtom } from "@/atoms/products";


const ProductsFlow = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    category?: Category['key'];
  }
>((
  props, 
  forwardedRef
) => {
  const filters = useAtomValue(productsFlowFiltersAtom);
  const sort = useAtomValue(productsFlowSortAtom);
  const productsQuery = useProductsQuery({
    category: props.category,
    sortBy: sort.sortBy,
    color: filters.color.join('|'),
    size: filters.size.join('|'),
    maxPrice: filters.maxPrice,
  });

  if (productsQuery.status === "success" && productsQuery.payload.items.length === 0) {
    return (
      <div
        className={cn(
          "w-full",
          "flex flex-row items-center justify-center gap-4 py-8",
        )}
      >
        <FaCircleExclamation className="w-8 h-8 text-neutral-400/45" />
        <h1 className="text-2xl font-bold text-neutral-400/45">
          No products found 
        </h1>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "w-full",
        "flex flex-col items-start justify-start gap-y-4"
      )}
    >
      <div
        {...props}
        ref={forwardedRef}
        className={cn(
          "w-full",
          "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "items-star justify-start t gap-x-4 gap-y-4",
          props.className,
        )}
      >
        {(productsQuery.payload?.items ?? []).map((product) => (
          <React.Fragment key={product.key}>
            <Link
              href={`/p/${product.key}`}
            >
              <Product 
                product={product}
                outlineOnHover={true}
                enableFavoritesButton={true}
                onHoverFavoritesButton={true}
              />
            </Link>
          </React.Fragment>
        ))}
      </div>
      <div
        className={cn(
          "w-full",
          "flex flex-row items-center justify-center",
        )}
      >
        <InfiniteScroll 
          hasMore={productsQuery.payload?.hasMore ?? false} 
          isLoading={productsQuery.status === "loading"} 
          next={productsQuery.loadMore} 
          threshold={1.0}
        >
          {(productsQuery.payload?.hasMore ?? false) && <h1>Loading...</h1>}
        </InfiniteScroll>
      </div>

    </div>
  )
});

ProductsFlow.displayName = "ProductsFlow";

export default ProductsFlow;