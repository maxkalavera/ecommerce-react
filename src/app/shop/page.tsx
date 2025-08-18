"use client"
import { useSearchParams } from 'next/navigation';
//import { fetchCategory } from "@/hooks/queries/categories";
import Document from "@/layouts/document";
import MainLayout from "@/layouts/main";
//import { fetchSSRQuery } from "@/lib/queries";
import { ShopURLParams } from "@/types/shop";
import { shopURLSchema } from "./parsers";
import BreadcrumbNavigation, { BreadcrumbItems } from "@/components/BreadcrumbNavigation";
import ScrollTopButton from "@/wrappers/ScrollTopButton";
import ProductsFlow from "@/components/ProductsFlow";
import ProductsFlowHeader from "@/components/ProductsFlowHeader";
import { toPartialUpperCase } from "@/lib/utils";
import { useCategoryQuery } from "@/hooks/queries/categories";


/******************************************************************************
 * Types
 */
/*
interface Props {
  searchParams: Promise<ShopURLParams>
}
*/

/******************************************************************************
 * Component
 */
export default function Shop() {
  let title = '';
  let breadcrumbs: BreadcrumbItems = [];
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const category = searchParams.get('category') || '';
  const categoryQuery = useCategoryQuery(category);
  if (category) {
    if (categoryQuery.status === 'success') {
      title = categoryQuery.payload.data.name;
      breadcrumbs = [
        ...(categoryQuery.payload.data.breadcrumbs || [])
      ];
    }
  } else if (typeof params.search === 'string' && params.search) {
    title = params.search;
  }

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
        { breadcrumbs.length > 0 && (
          <BreadcrumbNavigation items={breadcrumbs} />
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
          <ProductsFlow 
            category={searchParams.get('category')}
          />
        </Document.Section>
      </ScrollTopButton>
    </MainLayout>
  );
}
