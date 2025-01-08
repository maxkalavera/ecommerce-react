import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Document from "@/layouts/document";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <Document.Section>
        <Hero />
      </Document.Section>
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
    </>
  );
};