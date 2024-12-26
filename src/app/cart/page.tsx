"use client"
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import type { Product as ProductType } from "@/types/types";
import ProductCheckout from "@/components/ProductCheckout";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import Document from "@/layouts/document";

export default function Cart() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false);

  const nextProducts = useCallback(() => {
    setLoadingProducts(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp: any[] = [];
    for(let i = 0; i < 5; i++) {
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
      <Document.Section
        className="items-center"
      >
        <Document.SectionTitle className="w-full max-w-screen-sm">Cart</Document.SectionTitle>
        <div
          className={cn(
            "w-full h-fit max-w-screen-sm p-4",
            "flex flex-col justify-start items-start gap-8",
            "border-solid border-[1px] rounded-sm border-neutral-500"
          )}
        >
          {products.map((item) => (
            <ProductCheckout 
              key={item.id}
              product={item}
            />
          ))}
        </div>

        <div
          data-label="details"
          className={cn(
            "w-full h-fit max-w-screen-sm p-4",
            "flex flex-col justify-start items-start gap-2",
          )}
        >
          <div className="flex flex-row justify-between items-center gap-8">
            <h4 className="text-bold font-bold">Taxes:</h4>
            <h4 className="text-bold font-bold">$2.00 USD (0.2%)</h4>
          </div>
          <div className="flex flex-row justify-between items-center gap-8">
            <h4 className="text-bold font-bold">Shipping:</h4>
            <h4 className="text-bold font-bold">$5.00 USD</h4>
          </div>
          <div className="flex flex-row justify-between items-center gap-8">
            <h4 className="text-bold font-bold">Total:</h4>
            <h4 className="text-bold font-bold">$25.00 USD</h4>
          </div>
          <Button
            className="w-full mt-2"
          >
            Checkout
          </Button>
        </div>
      </Document.Section>
    </>
  );
}