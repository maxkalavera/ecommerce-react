import { fetchCategory } from "@/hooks/queries/categories";
import Document from "@/layouts/document";
import MainLayout from "@/layouts/main";
import { fetchSSRQuery } from "@/lib/queries";
import { ShopURLParams } from "@/types/shop";
import { shopURLSchema } from "./parsers";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import ScrollTopButton from "@/wrappers/ScrollTopButton";
import ProductsFlow from "./_components/ProductsFlow";
import ProductsFlowHeader from "./_components/ProductsFlowHeader";

/******************************************************************************
 * Types
 */
interface Props {
  searchParams: Promise<ShopURLParams>
}

/******************************************************************************
 * Component
 */
export default async function Shop(
  { 
    searchParams
  }: Props
) {
  const shopURLParams = await searchParams;
  const categoryData = await fetchSSRQuery({
    queryKey: ["category", shopURLParams.category || ""],
    queryFn: fetchCategory
  });
  const shopProps = await shopURLSchema.safeParseAsync(shopURLParams);
  
  const title = (
    (shopProps.success ? shopProps.data.search : undefined) || 
    (categoryData.isSuccess ? categoryData.data?.instance.name : undefined)
  );
  return (
    <MainLayout>
      {/***********************************************************************
       * Header section
       */}
      <Document.Section
        className="flex flex-row justify-between items-center gap-8"
      >
        <BreadcrumbNavigation />
        { title && (
          <Document.SectionTitle>
            {title.charAt(0).toLocaleUpperCase() + title.slice(1)}
          </Document.SectionTitle>
        )}
      </Document.Section>
      {/*********************************************************************** 
       * Content section: Shows a grid or list of products and filters and 
       * sorting options for the list of products
       */}
      <ScrollTopButton
        className="w-full max-w-screen-lg z-50"
        anchor="window"
      >
        <Document.Section>
          <ProductsFlowHeader />
        </Document.Section>
        <Document.Section>
          <ProductsFlow />
        </Document.Section>
      </ScrollTopButton>
    </MainLayout>
  );
}