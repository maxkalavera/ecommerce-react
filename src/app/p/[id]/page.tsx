"use client"
import ProductGallery from "@/components/ProductGallery";
//import { useParams } from "next/navigation";
import productData from "@/assets/mock/product.json";
import { Product as ProductType } from "@/types/types";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import { FaCartShopping } from "react-icons/fa6";
import ColorSelector from "@/components/ColorSelector";
import ItemSelector from "@/components/ItemSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { cn } from "@/lib/utils";
import Document from "@/layouts/document";


export default function ProductInfo() {
  //const params = useParams();
  //const productID = params.id;

  const product = productData as ProductType;

  return (
    <>
      <Document.Section>
        <BreadcrumbNavigation />
        <Document.SectionTitle>{product.name}</Document.SectionTitle>
      </Document.Section>

      <Document.Section
        className="w-full max-w-screen-lg flex flex-row justify-center items-start gap-2 md:gap-8"
      >
        <div 
          className="flex flex-col justify-start items-stretch gap-16"
        >
          <ProductGallery 
            images={product.gallery}
          />
        </div>

        <div
          className="w-full flex flex-col justify-start items-stretch gap-2 p-4 md:p-8"
        >
          <h3
            className="text-lg font-bold"
          >
            {product.name}
          </h3>
          <h3
            className="text-lg"
          >
            ${product.price} USD
          </h3>
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
            <p className="my-2">
              {product.description}
            </p>
          <Separator />
        </div>
      </Document.Section>
    </>
  );
}
