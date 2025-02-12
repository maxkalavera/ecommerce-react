'use client'
import { cn } from "@/lib/utils";
import React from "react";
import HorizontalScrollArea from "@/components/HorizontalScrollArea";
import Product from "@/components/Product";
import { ForLargeScreens, ForSmallScreens } from "@/layouts/screens";
import { Product as ProductType } from "@/types/products";
import { useProductsQuery } from "@/hooks/queries/products";


const FeaturedProducts = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    title: React.ReactNode,
    items: ProductType[]
  }
>((
  {
    title,
    className,
    ...props
  }, 
  forwardedRef
) => {
  const productsQuery = useProductsQuery({ featured: true });

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
          hasMore={productsQuery.hasNextPage}
          isLoading={productsQuery.isLoading}
          next={nextProducts} 
        >
          { productsQuery.data && productsQuery.data.pages.map((page, index) => (
            <React.Fragment key={index}>
              { page.items.map((product) => (
                <React.Fragment key={product.id}>
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
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}

          </HorizontalScrollArea>
      </div>
    </div>
  )
});

FeaturedProducts.displayName = "FeaturedProducts";

export default FeaturedProducts;