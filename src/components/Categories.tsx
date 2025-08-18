"use client"
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategoriesGrid from "@/components/CategoriesGrid";
import { Button } from "@/components/ui/button";
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
  React.ComponentPropsWithoutRef<React.ElementType> & {}
>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  const items = settings.content.home.tabs;
  const [activeTab, setActiveTab] = React.useState<string>(
    items.length > 0 
      ? items[0].key
      : ""
  );
  const categoriesQuery = useCategoriesQuery({ childrenOf: activeTab });

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
        {items.map(item => (
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
              {item.label}
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map(item => (
        <TabsContent
          key={item.key} 
          value={item.key}
        >
          <CategoriesGrid
            className="w-full justify-center md:justify-start"
            categories={categoriesQuery.payload?.items}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
});

Categories.displayName = "Categories";

export default Categories;