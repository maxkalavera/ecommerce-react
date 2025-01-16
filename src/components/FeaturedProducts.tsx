'use client'
import { cn } from "@/lib/utils";
import React from "react";
import HorizontalScrollArea from "@/components/HorizontalScrollArea";
import Product from "@/components/Product";
import { ForLargeScreens, ForSmallScreens } from "@/layouts/screens";
import { Product as ProductType } from "@/types/types";
import { useAtomValue } from "jotai";
import { featuredProductsAtom } from "@/atoms/products";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType> {
  title: React.ReactNode,
  items: ProductType[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FeaturedProducts = React.forwardRef<HTMLDivElement, Props>((
  {
    title,
    className,
    ...props
  }, 
  forwardedRef
) => {
  const data = useAtomValue(featuredProductsAtom);

  const nextProducts = React.useCallback(() => {

  }, []);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        className,
        "flex flex-col justify-start items-stretch",
      )}
    >
      <div
        data-label="featured-products-header"
        className="w-full flex flex-row justify-start items-center gap-2"
      >
        <HorizontalScrollArea
          className="w-full gap-4"
          hasMore={data.hasMore}
          isLoading={data.loading}
          next={nextProducts} 
        >
          { data.items.map((product) => (
            <div key={product.id}>
              <ForLargeScreens>
                <Product 
                  product={product}
                  outlineOnHover={true}
                  enableFavoritesButton={true}
                  hideFavoritesButton={true}
                  size="lg"
                />
              </ForLargeScreens>
              <ForSmallScreens>
                <Product 
                  product={product}
                  outlineOnHover={true}
                  enableFavoritesButton={true}
                  hideFavoritesButton={true}
                  size="md"
                />
              </ForSmallScreens>
            </div>
          ))}
          </HorizontalScrollArea>
      </div>
    </div>
  )
});

FeaturedProducts.displayName = "FeaturedProducts";

export default FeaturedProducts;