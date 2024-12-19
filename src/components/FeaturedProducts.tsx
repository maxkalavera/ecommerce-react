'use client'
import { cn } from "@/lib/utils";
import React, { ReactNode, useCallback, useState } from "react";
import HorizontalScrollArea from "@/components/HorizontalScrollArea";
import Product from "@/components/Product";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType> {
  title: ReactNode,
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
  const [products, setProducts] = useState([
    { name: "Shirt", id: 0, price: "300.00", label: { color: "red", content: "25% OFF" } }, { name: "Striped shirt", id: 1 }, { name: "Jeans", id: 2 }])
  const [loadingProducts, setLoadingProducts] = useState(false);

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
        <h3 className="w-full text-lg text-bold font-bold">{title}</h3>
      </div>
      <div
        data-label="featured-products-header"
        className="w-full flex flex-row justify-start items-center gap-2"
      >
        <HorizontalScrollArea
          className="w-full gap-4"
          hasMore={true} 
          isLoading={loadingProducts} 
          next={nextProducts} 
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
          </HorizontalScrollArea>
      </div>
    </div>
  )
});

FeaturedProducts.displayName = "FeaturedProducts";

export default FeaturedProducts;