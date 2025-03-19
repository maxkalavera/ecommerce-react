"use client"
import { favoriteProductsAtom } from "@/atoms/products";
import Product from "@/components/Product";
import document from "@/layouts/document";
import MainLayout from "@/layouts/main";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";


export default function Favorites() {
  const data = useAtomValue(favoriteProductsAtom);

  return (
    <MainLayout>
      <document.Section
      >
        <document.SectionTitle>Favorites</document.SectionTitle>
        <document.SectionFrame
          className={cn(
            "w-full h-fit",
            "grid gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
          )}
        >
          {data.items.map((item) => (
            <Product 
              key={item.id}
              className="outline-none outline-0"
              product={item}
              enableFavoritesButton={true}
              enableAddCartButton={true}
            />
          ))}
        </document.SectionFrame>
      </document.Section>
    </MainLayout>
  );
};
