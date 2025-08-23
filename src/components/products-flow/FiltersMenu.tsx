import React from "react";
import { useSetAtom } from "jotai";
import { cn } from "@/lib/utils";
import ColorMultiSelector from "@/components/products-flow/ColorMultiSelector";
import ItemMultiSelector from "@/components/products-flow/ItemMultiSelector";
import PriceSelector from "@/components/products-flow/PriceSelector";
import { Button } from "@/components/ui/button";
import { ProductsFLowFilters } from '@/types/products';
import { productsFlowFiltersAtom, initialProductsFlowFilters } from "@/atoms/products";


const FiltersMenu = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<React.ElementType> & {}
>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const setFiltersAtom = useSetAtom(productsFlowFiltersAtom);
  const [filters, setFilters] = React.useState<ProductsFLowFilters>(initialProductsFlowFilters);

  const commit = React.useCallback(() => {
    setFiltersAtom(filters);
  }, [filters]);

  const clear = React.useCallback(() => {
    setFilters(initialProductsFlowFilters);
    commit();
  }, []);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full h-fit",
        "flex flex-col justify-start items-start gap-6",
        className,
      )}
    >
      <div
        data-label="filter"
        className={cn(
          "w-full",
          "flex flex-col justify-start items-start gap-2"
        )}
      >
        <h4 
          className="font-serif font-bold text-sm select-none"
        >
          Color
        </h4>
        <ColorMultiSelector 
          items={[
            { color: "#000000", value: "Black"},
            { color: "#FFFFFF", value: "White"},
            { color: "#808080", value: "Gray"},
            { color: "#F5F5DC", value: "Beige"},
            { color: "#000080", value: "Navy Blue"},
            { color: "#0000FF", value: "Blue"},
            { color: "#ADD8E6", value: "Light Blue"},
            { color: "#FF0000", value: "Red"},
            { color: "#FFC0CB", value: "Pink"},
            { color: "#008000", value: "Green"},
            { color: "#A52A2A", value: "Brown"},
            { color: "#C3B091", value: "Khaki"},
          ]}
          selected={filters.color}
          onSelectChange={(selected: string[]) => {
            setFilters({
              ...filters,
              color: selected,
            })
          }}
        />
      </div>

      <div
        data-label="filter"
        className={cn(
          "w-full",
          "flex flex-col justify-start items-start gap-2"
        )}
      >
        <h4 
          className="font-serif font-bold text-sm select-none"
        >
          Size
        </h4>
        <ItemMultiSelector 
          size="sm"
          items={[
            { label: "XS", value: "xs" },
            { label: "S", value: "s" },
            { label: "M", value: "m" },
            { label: "L", value: "l" },
            { label: "XL", value: "xl" },
            { label: "2XL", value: "2xl" },
            { label: "3XL", value: "3xl" },
            { label: "4XL", value: "4xl" },
          ]}
          selected={filters.size}
          onSelectChange={(selected: string[]) => {
            setFilters({
              ...filters,
              size: selected,
            })
          }}
        />
      </div>
      <div
        data-label="filter"
        className={cn(
          "w-full",
          "flex flex-col justify-start items-start gap-2"
        )}
      >
        <h4 
          className="font-serif font-bold text-sm select-none"
        >
          Price
        </h4>
        <PriceSelector 
          items={[0, 50, 100, 250, 500]}
          value={filters.maxPrice === undefined ? null : filters.maxPrice}
          onChange={(value: number | null) => {
            setFilters({
              ...filters,
              maxPrice: value === null ? undefined : value,
            })
          }}
        />
      </div>
      <div
        className={cn(
          "w-full flex flex-row justify-between items-start gap-2",
          "select-none"
        )}
      >
        <Button 
          variant="secondary"
          onClick={clear}
        >
            Clear
        </Button>
        <Button 
          variant="default"
          onClick={commit}
        >
          See results
        </Button>
      </div>
    </div>
  )
});

FiltersMenu.displayName = "FiltersMenu";

export default FiltersMenu;