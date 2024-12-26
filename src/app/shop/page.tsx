
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import ProductGrid from "@/components/ProductGrid";
import ScrollTopButton from "@/wrappers/ScrollTopButton";
import Document from "@/layouts/document";

export default function Shop() {
  return (
    <>
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
    </>
  );
}
