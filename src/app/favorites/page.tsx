"use client"
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Product as ProductType } from "@/types/types";
import { useAtomValue } from "jotai";
import Product from "@/components/Product";
import MainLayout from "@/layouts/main";
import Document from "@/layouts/document";
import { favoriteProductsAtom } from "@/atoms/products";

export default function Favorites() {
  const data = useAtomValue(favoriteProductsAtom);

  return (
    <MainLayout>
      <Document.Section>
        <Document.SectionTitle>Favorites</Document.SectionTitle>
        <div
          className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6"
        >
          {data.items.map((item) => (
            <Product 
              key={item.id}
              className="outline-none outline-0"
              product={item}
              enableFavoritesButton={true}
              enableAddCartButton={true}
              size="dynamic"
            />
          ))}
        </div>
      </Document.Section>
    </MainLayout>
  );
}