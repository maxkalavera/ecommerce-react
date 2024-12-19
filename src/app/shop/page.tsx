import PageTitle from "@/components/PageTitle";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { cn } from "@/lib/utils";
import ProductGrid from "@/components/ProductGrid";
import ScrollTopButton from "@/wrappers/ScrollTopButton";

export default function Shop() {
  return (
    <div 
      className={cn(
        "w-full h-fit",
        "flex flex-col justify-start items-center gap-8 p-8"
      )}
    >
      <div
        className={cn(
          "w-full max-w-screen-lg",
          "flex flex-col justify-start items-start gap-4"
        )}
      >
        <BreadcrumbNavigation />
        <PageTitle>Search topic or Section</PageTitle>
      </div>

      <ScrollTopButton
        className="w-full max-w-screen-lg z-50"
        anchor="window"
      >
        <ProductGrid 
          className="w-full"
        />
      </ScrollTopButton>

      
      <div
        className={cn(
          "w-full max-w-screen-lg",
          "flex flex-col justify-start items-start gap-4"
        )}
      >

      </div>

    </div>
  );
}
