import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div 
      className="flex flex-col justify-start items-stretch gap-16"
    >
      <Hero />
      <div
        className={cn(
          "w-full px-4",
          "flex flex-col justify-start items-center gap-16"
        )}
      >
        {
          <Categories 
            className="w-full max-w-screen-lg"
          />
        }

        <FeaturedProducts 
          className="w-full max-w-screen-lg"
          title="Featured products"
        />
      </div>
    </div>
  );
}
