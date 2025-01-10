"use client"
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import type { Product as ProductType } from "@/types/types";
import ProductCheckout from "@/components/ProductCheckout";
import { Button } from "@/components/ui/button";
import Document from "@/layouts/document";
import { Separator } from "@/components/ui/separator";

const style = {
  detailsItem: cn(
    "w-full h-fit",
    "flex flex-row justify-between items-center gap-4"
  ),
  detailsItemText: cn(
    "text-bold font-bold"
  )
}

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
        <Document.SectionTitle 
          className="w-full max-w-lg"
        >
          Cart
        </Document.SectionTitle>

        <div
          className={cn(
            "w-full h-fit max-w-lg p-6",
            "flex flex-col justify-start items-start gap-4",
            "border-solid border-[1px] rounded-sm border-neutral-500"
          )}
        >
          {/*products.map((item) => (
            <ProductCheckout 
              key={item.id}
              product={item}
            />
          ))*/}
            
            <ProductCheckout 
              product={{ name: `product 1`, id: 1, isFavorite: true, }}
            />
            <Separator />
            <ProductCheckout 
              product={{ name: `product 2`, id: 2, isFavorite: false, }}
            />
            <Separator />
            <ProductCheckout 
              product={{ name: `product 3`, id: 3, isFavorite: false, }}
            />
        </div>

        <div
          data-label="details"
          className={cn(
            "w-full h-fit max-w-lg p-4",
            "flex flex-col justify-start items-center gap-2"
          )}
        >
          <div className={style.detailsItem}>
            <h4 className={style.detailsItemText}>Taxes:</h4>
            <h4 className={style.detailsItemText}>$2.00 USD (0.2%)</h4>
          </div>
          <div className={style.detailsItem}>
            <h4 className={style.detailsItemText}>Shipping:</h4>
            <h4 className={style.detailsItemText}>$5.00 USD</h4>
          </div>
          <div className={style.detailsItem}>
            <h4 className={style.detailsItemText}>Total:</h4>
            <h4 className={style.detailsItemText}>$25.00 USD</h4>
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