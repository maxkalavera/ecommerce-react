"use client"
import React from "react";
import document from "@/layouts/document";
import MainLayout from "@/layouts/main";
import { useParams, notFound } from "next/navigation";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product as ProductType } from "@/types/products";
import productsData from "@/assets/mock/products.json";
import { cn } from "@/lib/utils";
import ImageGallery from "../_components/ImageGallery";
import { Separator } from "@/components/ui/separator";
import ColorSelector from "../_components/ColorSelector";
import ItemSelector from "../_components/ItemSelector";
import { Button } from "@/components/ui/button";
import { FaCartShopping } from "react-icons/fa6";


/******************************************************************************
 * Main Component
 */

export default function ProductInfo() {
  const params = useParams();
  const products = productsData as unknown as ProductType[];
  const product = products.find((item) => item.key === params.key);

  if (product === undefined) {
    notFound();
  }
  return (
    <MainLayout>
      <document.Section className="gap-md">
        <BreadcrumbNavigation />
        <document.SectionTitle>{product.name}</document.SectionTitle>
      </document.Section>

      <document.Section className="flex flex-row justify-start items-start gap-xl">
        <Panel>
          <ImageGallery images={product.gallery} />
        </Panel>

        <Panel className="w-full">
          <Info product={product} />
        </Panel>
      </document.Section>
    </MainLayout>
  );
};


/******************************************************************************
 * Secondary Components
 */

const Panel: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col justify-center items-start gap-sm sm:gap-md",
        props.className
      )}
    >
      {props.children}
    </div>
  )
};


const Info: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    product: ProductType;
  }
> = ({
  product,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col justify-center items-start gap-xs",
        props.className
      )}
    >
      <h3 className="text-lg font-bold">
        {product.name}
      </h3>
      <h3 className="text-lg">
        {`$${product.price} USD`} 
      </h3>
      <Separator />
      <p>
        {product.description}
      </p>
      <Separator />
      <div
        data-label="linked-options"
        className="flex flex-col justify-start items-start gap-4"
      >
        <div
          className="flex flex-col justify-start items-start gap-2"
        >
          <h3 className="text-base font-bold">Color</h3>
        <ColorSelector />
        </div>

        <div
          className="flex flex-col justify-start items-start gap-2"
        >
          <h3 className="text-base font-bold">Size</h3>
          <ItemSelector 
            items={[
              { label: "XS", value: "xs" },
              { label: "S", value: "s" },
              { label: "M", value: "m" },
              { label: "L", value: "l" },
              { label: "XL", value: "xl" },
            ]}
          />
        </div>

        <div
          className="flex flex-col justify-start items-start gap-2"
        >
          <h3 className="text-base font-bold">Quantity</h3>
          <Select
            defaultValue="1"
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button className="mt-8">
            <FaCartShopping /> Add Cart
        </Button>
        <Separator />
    </div>
  )
};
