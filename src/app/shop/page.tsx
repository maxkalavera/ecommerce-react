import React from "react";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import ScrollTopButton from "@/wrappers/ScrollTopButton";
import MainLayout from "@/layouts/main";
import Document from "@/layouts/document";
import { fetchCategory } from "@/hooks/queries/categories";
import { fetchSSRQuery } from "@/lib/queries";
import { ShopURLParams } from "@/types/shop";
import ProductsGrid from "./components/ProductsGrid";
import { cn } from "@/lib/utils";
import ProductsGridHeader from "./components/ProductGridHeader";
import parseShopURLParams from "./parsers";


export default async function Shop(
  { 
    searchParams
  }: { 
    searchParams: Promise<ShopURLParams>
  }
) {
  const shopURLParams = await searchParams;
  const categoryData = await fetchSSRQuery({
    queryKey: ["category", shopURLParams.category || ""],
    queryFn: fetchCategory
  });
  const shopProps = await parseShopURLParams(await searchParams, categoryData.data?.instance);
  
  return (
    <MainLayout>
      <Document.Section>
        <BreadcrumbNavigation />
        { shopProps.search || (categoryData?.isSuccess && categoryData.data?.instance.name) && (
          <Document.SectionTitle
            className="capitalize"
          >
            {shopProps.search || (categoryData.isSuccess && categoryData.data?.instance.name)}
          </Document.SectionTitle>
        )}
      </Document.Section>
      <Document.Section>
        <ScrollTopButton
          className="w-full max-w-screen-lg z-50"
          anchor="window"
        >
          <div
            className={cn(
              "w-full min-h-[148px]",
              "flex flex-col justify-start items-start gap-2",
            )}
          >
            <ProductsGridHeader 
              className="w-full"
            />
            <ProductsGrid
            />
          </div>
        </ScrollTopButton>
      </Document.Section>
    </MainLayout>
  );
};
