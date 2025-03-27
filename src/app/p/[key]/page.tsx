"use client"
import React from "react";
import MainLayout from "@/layouts/main";
import { useParams, notFound } from "next/navigation";
import { Product as ProductType } from "@/types/products";
import productsData from "@/assets/mock/products.json";
import Document from "@/layouts/document";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import BreadcrumbNavigation, { BreadcrumbItems } from "@/components/BreadcrumbNavigation";
import { toPartialUpperCase, itemizeCategories } from "@/lib/utils";
import ImageGallery from "../_components/ImageGallery";
import ColorSelector from "../_components/ColorSelector";
import SizeSelector from "../_components/SizeSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { FaCartPlus, FaHeart } from "react-icons/fa6";
import MarkdownIt from 'markdown-it';


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
      <Document.Section>
        <div
          className={cn(
            "w-full h-fit",
            "flex flex-row justify-start items-start gap-xl"
          )}
        >
          <ImageGallery 
            images={product.gallery} 
            className="w-[420px]" 
          />
          <InfoWidget
            product={product}
            className="w-full"
          />
        </div>

      </Document.Section>
    </MainLayout>
  );
};


/******************************************************************************
 * Secondary Components
 */

const InfoWidget: React.FC<
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
        "flex flex-col justify-start items-start gap-0",
        props.className
      )}
    >
      <Separator />
      
      <InfoPanel>
        <BreadcrumbNavigation 
          items={[{ content: "Women", href: "#" }, { content: "Shirts", href: "#" }]}
        />
        <InfoPanelTitle>{product.name}</InfoPanelTitle>
        <h4 className="text-base font-bold text-neutral-600">
          {`$${product.price}`}
        </h4>
      </InfoPanel>
      
      <Separator />
      
      <InfoPanel>
        <InfoPanelTitle>{"Color"}</InfoPanelTitle>
        <ColorSelector />
      </InfoPanel>

      <InfoPanel>
      <InfoPanelTitle>{"Size"}</InfoPanelTitle>
      <SizeSelector />
      </InfoPanel>

      <InfoPanel>
        <Options className="w-full" />
      </InfoPanel>

      <Separator />

      <InfoPanel>
        <ProductDescription />
      </InfoPanel>
    </div>
  );
};

InfoWidget.displayName = "InfoWidget";


const InfoPanel: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full h-fit",
        "px-md py-md",
        "flex flex-col justify-start items-stretch gap-xs",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

InfoPanel.displayName = "InfoPanel";


const InfoPanelTitle: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    children: string;
  }
> = ({
  ...props
}) => {
  return (
    <h2
      {...props}
      className={cn(
        "text-xl font-bold text-neutral-900",
        props.className
      )}
    >
      {toPartialUpperCase(props.children)}
    </h2>
  );
};

InfoPanelTitle.displayName = "InfoPanelTitle";


const Options: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  const availableItems = 3;

  return (
    <div
      {...props}
      className={cn(
        "flex flex-row justify-start items-start gap-xs",
        props.className
      )}
    >
      <Select
        defaultValue={availableItems < 1 ? "0" : "1"}
        disabled={availableItems < 1}
      >
        <SelectTrigger className="w-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array(availableItems).fill("").map((_, index) => (
            <SelectItem 
              key={`${index + 1}`}
              value={`${index + 1}`}
            >
              {`${index + 1}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className="w-full"
      >
        <FaCartPlus />
        Add Cart
      </Button>

      <Button
        className="w-fit"
        variant="outline"
      >
        <FaHeart />
        Favorites
      </Button>
    </div>
  );
};

Options.displayName = "Options";


const ProductDescription: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {}
> = ({
  ...props
}) => {
  const markdown = React.useMemo(() => {
    return new MarkdownIt()
  }, []);

  const content = `
Elevate your wardrobe with this Elegant Turtleneck Top , a timeless and versatile piece designed to add sophistication to any outfit. Whether you're dressing up for a chic evening look or keeping it casual for a relaxed day, this top effortlessly combines style and comfort.

Specifications
- Color : Pure White
- Sizes Available : XS, S, M, L, XL  
(Refer to our size chart for the perfect fit)
- Fabric Composition :
	- 70% Cotton, 25% Polyester, 5% Elastane
	- Soft, breathable, and stretchable fabric for all-day comfort.
- Care Instructions :
	- Machine wash cold with like colors.
	- Do not bleach.
	- Tumble dry low or hang to dry.
	- Iron on low heat if needed.  
`


  return (
    <div
      {...props}
      className={cn(
        "markdown-body",
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
    >
    </div>
  );
};

InfoPanelTitle.displayName = "InfoPanelTitle";