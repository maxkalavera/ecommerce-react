import React, { useCallback, useEffect, useState } from "react";
import Category from "@/components/Category";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoriesGrid = React.forwardRef<HTMLDivElement, Props>((
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
    nextCategories();
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
      <div
        className="grid place-content-center grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 min-[520px]:gap-4 md:gap-8"      
      >
        { categories.map((category) => (
          <Category 
            key={category.id} 
            category={category}
            hoverable={true}
            size="lg"
          />
        ))}
      </div>
    </div>
  )
});

CategoriesGrid.displayName = "CategoriesGrid";

export default CategoriesGrid;