import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
//import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Document from "@/layouts/document";
import Header from "@/components/Header";


export default function Home() {
  return (
    <Document.Root>
      <Hero >
        <Header className="max-w-screen-lg" />
      </Hero>

      <Document.Frame>
        <Document.Section>
          <Document.SectionTitle>Categories</Document.SectionTitle>
          <Categories 
            className="w-full max-w-screen-lg"
          />
        </Document.Section>
        {/* 
          <Document.Section>
            <Document.SectionTitle>Featured Products</Document.SectionTitle>
            <FeaturedProducts
              className="w-full max-w-screen-lg"
              title="Featured products"
            />
          </Document.Section>
        */}
      </Document.Frame>
      <Footer />
    </Document.Root>
  );
}
