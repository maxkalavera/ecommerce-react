import React, { useCallback, useEffect, useState } from "react";
import Category from "@/components/Category";
import { cn } from "@/lib/utils";
import InfiniteScroll from "./ui/infinite-scroll";
import HorizontalScrollArea from "./HorizontalScrollArea";
import { ForLargeScreens, ForSmallScreens } from "@/layouts/screens";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoriesRow = React.forwardRef<HTMLDivElement, Props>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const [categories, setCategories] = useState([
    { name: "Outwear", id: 0 }, { name: "Office outfits", id: 1 }, { name: "Workout", id: 2 }])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingCategories, setLoadingCategories] = useState(false);

  const nextCategories = useCallback(() => {
    setLoadingCategories(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp: any[] = [];
    for(let i = 0; i < 5; i++) {
      tmp.push({ name: `${categories.length + i}`, id: categories.length + i })
    }
    setCategories((prev) => prev.concat(tmp));
    setLoadingCategories(false);
  }, [categories]);

  useEffect(() => {
    //nextCategories();
    return () => {
      setCategories([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "flex flex-row justify-start items-start",
        className,
      )}
    >
      <HorizontalScrollArea
        className="w-full gap-4"
        hasMore={true} 
        isLoading={loadingCategories} 
        next={nextCategories} 
      >
        { categories.map((category) => (
          <div key={category.id}>
            <ForSmallScreens>
              <Category 
                key={category.id} 
                category={category}
                hoverable={true}
                size="sm"
              />
            </ForSmallScreens>
            <ForLargeScreens>
              <Category 
                key={category.id} 
                category={category}
                hoverable={true}
                size="md"
              />
            </ForLargeScreens>
          </div>
        ))}
      </HorizontalScrollArea>
    </div>
  )
});

CategoriesRow.displayName = "CategoriesRow";

export default CategoriesRow;