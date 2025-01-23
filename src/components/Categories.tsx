"use client"
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategoriesGrid from "./CategoriesGrid";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/types/types";
import { useAtom, useAtomValue } from "jotai";
import { activeTabAtom, tabsAtom, activeTabCategoriesAtom } from "@/atoms/categories";

const styles = {
  tabsTrigger: cn(
    "px-0 py-1",
    "text-base",
    "data-[state=active]:shadow-none data-[state=active]:font-bold data-[state=active]:underline",
  )
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Categories = React.forwardRef<HTMLDivElement, Props>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const tabs = useAtomValue(tabsAtom);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const categories = useAtomValue(activeTabCategoriesAtom);

  return (
    <Tabs
      {...props}
      ref={forwardedRef}
      className={cn(
        className,
      )}
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="bg-transparent gap-4">
        {tabs.map(item => (
          <TabsTrigger 
            key={item.referenceKey} 
            value={item.referenceKey} 
            asChild
          >
            <Button
              variant="link"
              className={cn(
                styles.tabsTrigger,
              )}
            >
              {item.name}
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(item => (
        <TabsContent
          key={item.referenceKey} 
          value={item.referenceKey}
        >
          <CategoriesGrid
            className="w-full justify-center md:justify-start"
            categories={categories}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
});

Categories.displayName = "Categories";

export default Categories;