"use client"
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategoriesGrid from "./CategoriesGrid";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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


  return (
    <Tabs
      {...props}
      ref={forwardedRef}
      className={cn(
        className,
      )}
      defaultValue="women"
    >
      <TabsList className="bg-transparent gap-4">
        <TabsTrigger value="women" asChild>
          <Button
            variant="link"
            className={cn(
              styles.tabsTrigger,
            )}
          >
            Women
          </Button>
        </TabsTrigger>
        <TabsTrigger value="men" asChild>
          <Button
            variant="link"
            className={styles.tabsTrigger}
          >
            Men
          </Button>
        </TabsTrigger>
        <TabsTrigger value="sale" asChild>
          <Button
            variant="link"
            className={styles.tabsTrigger}
          >
            Sale
          </Button>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="women">
        <CategoriesGrid className="w-full justify-center md:justify-start" />
      </TabsContent>
      <TabsContent value="men">
        <CategoriesGrid />
      </TabsContent>
      <TabsContent value="sale">
        <CategoriesGrid />
      </TabsContent>
    </Tabs>
  )
});

Categories.displayName = "Categories";

export default Categories;