"use client"
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Product as ProductType } from "@/types/types";
import Product from "@/components/Product";
import Document from "@/layouts/document";

export default function Favorites() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false);

  const nextProducts = useCallback(() => {
    setLoadingProducts(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp: any[] = [];
    for(let i = 0; i < 15; i++) {
      tmp.push({ name: `${products.length + i}`, id: products.length + i, isFavorite: true, })
    }
    setProducts((prev) => prev.concat(tmp));
    setLoadingProducts(false);
  }, [products]);

  useEffect(() => {
    nextProducts();
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <>
      <Document.Section>
        <Document.SectionTitle>Favorites</Document.SectionTitle>
        <div
          className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6"
        >
          {products.map((item) => (
            <Product 
              key={item.id}
              product={item}
              enableFavoritesButton={true}
              enableAddCartButton={true}
              size="dynamic"
            />
          ))}
        </div>
      </Document.Section>
    </>
  );
}