import { fetchCategory } from "@/hooks/queries/categories";
import Document from "@/layouts/document";
import MainLayout from "@/layouts/main";
import { fetchSSRQuery } from "@/lib/queries";
import { ShopURLParams } from "@/types/shop";
import { shopURLSchema } from "./parsers";
import BreadcrumbNavigation, { BreadcrumbItems } from "@/components/BreadcrumbNavigation";
import ScrollTopButton from "@/wrappers/ScrollTopButton";
import ProductsFlow from "./_components/ProductsFlow";
import ProductsFlowHeader from "./_components/ProductsFlowHeader";
import { toPartialUpperCase, itemizeCategories } from "@/lib/utils";

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
  
  const breadcrumbs: BreadcrumbItems = categoryData.isSuccess ? 
    itemizeCategories((categoryData.data?.instance)) : 
    [];
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
        className="flex flex-col justify-start items-start gap-2"
      >
        { title && (
          <Document.SectionTitle className="mb-0">
            {toPartialUpperCase(title)}
          </Document.SectionTitle>
        )}
        <BreadcrumbNavigation items={breadcrumbs} />
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
