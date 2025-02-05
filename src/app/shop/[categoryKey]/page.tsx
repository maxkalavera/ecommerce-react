import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import ProductGrid from "@/components/ProductGrid";
import ScrollTopButton from "@/wrappers/ScrollTopButton";
import MainLayout from "@/layouts/main";
import Document from "@/layouts/document";
import { fetchCategories, fetchCategory } from "@/hooks/queries/categories";
import { QueryClient } from "@tanstack/react-query";
import { fetchSSRQuery } from "@/lib/queries";
import { notFound } from 'next/navigation';
import { Category } from "@/types/categories";

export async function generateStaticParams() {
  const categoriesData = await fetchSSRQuery({ 
    queryKey: ["categories"], 
    queryFn: fetchCategories 
  });
  if (categoriesData.isSuccess) {
    return categoriesData.data?.items.map(item => ({
      categoryKey: item.key,
    }));
  } else {
    throw categoriesData.error
  }
}

export default async function Shop(
  { 
    params,
    searchParams
  }: { 
    params: Promise<{ categoryKey: Category['key'] }>,
    searchParams: Promise<{ search: string }>
  }
) {
  const { categoryKey } = await params;
  const { search } = await searchParams;
  const categoryData = await fetchSSRQuery({
    queryKey: ["category", categoryKey],
    queryFn: fetchCategory
  });

  if (
    !categoryData.isSuccess && 
    categoryData.error?.code === "category-not-retrived"
  ) {
    return notFound();
  }

  console.log("Search", search)

  return (
    <MainLayout>
      <Document.Section>
        <BreadcrumbNavigation />
        <Document.SectionTitle>Search topic or Section</Document.SectionTitle>
      </Document.Section>
      <Document.Section>
        <ScrollTopButton
          className="w-full max-w-screen-lg z-50"
          anchor="window"
        >
          <ProductGrid 
            className="w-full"
          />
        </ScrollTopButton>
      </Document.Section>
    </MainLayout>
  );
}
