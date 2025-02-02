"use client"
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategoriesGrid from "./CategoriesGrid";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

import settings from "@/settings";
import { useCategoriesQuery } from "@/hooks/queries/categories";

const styles = {
  tabsTrigger: cn(
    "px-0 py-1",
    "text-base",
    "data-[state=active]:shadow-none data-[state=active]:font-bold data-[state=active]:underline",
  )
};

const Categories = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {

  }
>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const [activeTab, setActiveTab] = React.useState<string>(
    settings.categories.tabs.length > 0 ? settings.categories.tabs[0].key : "");
  const categoriesQuery = useCategoriesQuery({ rootCategory: activeTab });

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
        {settings.categories.tabs.map(item => (
          <TabsTrigger 
            key={item.key} 
            value={item.key} 
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

      {settings.categories.tabs.map(item => (
        <TabsContent
          key={item.key} 
          value={item.key}
        >
          <CategoriesGrid
            className="w-full justify-center md:justify-start"
            categories={categoriesQuery.data.items}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
});

Categories.displayName = "Categories";

export default Categories;