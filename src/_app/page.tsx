import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Document from "@/layouts/document";

export default function Home() {
  return (
    <Document.Root>
      <Document.Frame>
        <div
          className="w-full h-fit"
        >
          <Document.Section>
            <Document.SectionTitle>Categories</Document.SectionTitle>
            <Categories 
              className="w-full max-w-screen-lg"
            />
          </Document.Section>
          <Document.Section>
          <Document.SectionTitle>Featured Products</Document.SectionTitle>
            <FeaturedProducts
              className="w-full max-w-screen-lg"
              title="Featured products"
            />
          </Document.Section>
        </div>
      </Document.Frame>
      <Footer />
    </Document.Root>
  );
}


/******************************************************************************
 * Secondary components
 */



/******************************************************************************
 * Notes
 */

/*
export default function Home() {
  return (
    <div
    className={cn(
      "w-full h-fit",
      "flex flex-col justify-start items-center"
    )}
  >
    <Header 
      className="max-w-screen-lg"
    />
    <Hero className="mt-8 max-w-screen-lg" />
    <Document.Frame>
      <div
        className="w-full h-fit"
      >
        <Document.Section>
          <Document.SectionTitle>Categories</Document.SectionTitle>
          <Categories 
            className="w-full max-w-screen-lg"
          />
        </Document.Section>
        <Document.Section>
        <Document.SectionTitle>Featured Products</Document.SectionTitle>
          <FeaturedProducts 
            className="w-full max-w-screen-lg"
            title="Featured products"
          />
        </Document.Section>
      </div>
    </Document.Frame>
    <Footer className="mt-8" />
  </div>
  );
};
*/