"use client"
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import Product from "@/components/Product";
import SearchFilters from "@/components/SearchFilters";
import InfiniteScroll from '@/components/ui/infinite-scroll';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProductGrid = React.forwardRef<HTMLDivElement, Props>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const [products, setProducts] = useState([
    { name: "Shirt", id: 0, price: "300.00", label: { color: "red", content: "25% OFF" } }, { name: "Striped shirt", id: 1 }, { name: "Jeans", id: 2 }])
  const [loadingProducts, setLoadingProducts] = useState(false);

  const nextProducts = useCallback(() => {
    setLoadingProducts(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp: any[] = [];
    for(let i = 0; i < 15; i++) {
      tmp.push({ name: `${products.length + i}`, id: products.length + i })
    }
    setProducts((prev) => prev.concat(tmp));
    setLoadingProducts(false);
  }, [products]);

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
      <SearchFilters 
        className="w-full mb-4 bg-background z-30"
      />

      <InfiniteScroll 
        hasMore={true} 
        isLoading={loadingProducts} 
        next={nextProducts} 
        threshold={0.5}
      >
        <div
          className={cn(
            "w-fit",
            "grid grid-cols-4 justify-start items-start gap-x-8 gap-y-8"
          )}
        >
          { products.map((product) => (
            <Product 
              key={product.id}
              product={product}
              outlineOnHover={true}
              enableFavoritesButton={true}
              hideFavoritesButton={true}
            />
          ))}
        </div>
        <h1>Loading...</h1>
      </InfiniteScroll>
    </div>
  )
});

ProductGrid.displayName = "ProductGrid";

export default ProductGrid;