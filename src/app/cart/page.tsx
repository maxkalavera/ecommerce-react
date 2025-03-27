"use client"
import document from "@/layouts/document";
import MainLayout from "@/layouts/main";
import { cn } from "@/lib/utils";
import Item from "./_components/Item";
import Summary from "./_components/Summary";
import { useAtomValue } from "jotai";
import { cartProductsAtom } from "@/atoms/products";


export default function Cart() {
  const data = useAtomValue(cartProductsAtom);

  return (
    <MainLayout>
      <document.Section>
        <document.SectionTitle>Cart</document.SectionTitle>

        <document.SectionFrame
          className={cn(
            "w-full h-fit",
            "flex flex-row justify-start items-stretch gap-12"
          )}
        >
          <div
            className={cn(
              "w-full h-fit",
              "flex flex-col justify-start items-start gap-8"
            )}
          >
            {data.items.map((item, index) => ( 
              <Item 
                key={index}
                product={item}
                className="w-fit"
              />
            ))}
            
          </div>
          <div
            className={cn(
              "flex flex-col justify-start items-center gap-12"
            )}
          >
            <Summary className="sticky top-4" />
          </div>
        </document.SectionFrame>

      </document.Section>
    </MainLayout>
  );
};
