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
import { toPartialUpperCase } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";
import ColorSelector from "@/components/ColorSelector";
import SizeSelector from "@/components/SizeSelector";
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
import { useProductQuery } from '@/hooks/queries/products';
import { useAddCartItemMutation } from '@/hooks/queries/carts';
import { useQueriesNotifyer } from "@/atoms/queries";


/******************************************************************************
 * Main Component
 */

export default function ProductInfo() {
  const params = useParams();
  if (typeof params.key !== 'string') {
    return notFound();
  }
  const productQuery = useProductQuery(params.key);
  const addCartItemMutation = useAddCartItemMutation();
  const notifyQueries = useQueriesNotifyer();

  React.useEffect(() => {
    addCartItemMutation.onSuccess(() => {
      productQuery.fetch([params.key as string]);
      notifyQueries.refetch('useGetCartItemsCount');
    });
    addCartItemMutation.onFailure(() => {
      productQuery.fetch([params.key as string]);
      notifyQueries.refetch('useGetCartItemsCount');  
    });
  }, []);

  const handleAddCart = React.useCallback((productKey: string, quantity: number) => {
    addCartItemMutation.fetch([productKey, quantity]);
  }, []);

  if (productQuery.payload === null) {
    return (
      <>loading...</>
    )
  } else if ((['error'] as typeof productQuery.status[]).includes(productQuery.status)) {
    return notFound();
  }

  const product = productQuery.payload.data;
  return (
    <MainLayout>
      <Document.Section>
        <div
          className={cn(
            "w-full h-fit",
            "flex flex-col justify-start items-center gap-xl",
            "md:flex md:flex-row md:justify-start md:items-start md:gap-xl"
          )}
        >
          <ImageGallery 
            images={product.images} 
            className="max-w-[420px] md:min-w-[350px] md:w-[350px]" 
          />
          <InfoWidget
            className="w-full"
            product={product}
            handleAddCart={handleAddCart}
            addCartLoading={addCartItemMutation.status === 'loading'}
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
    handleAddCart: (productKey: string, quantity: number) => void;
    addCartLoading: boolean;
  }
> = ({
  product,
  handleAddCart,
  addCartLoading,
  ...props
}) => {
  const initials = {
    color: product.color.name,
    size: null,
  };
  const filterInventory = React.useCallback((
    color: string | null = null,
    size: string | null = null,
  ) => {
    return product.inventory.map(item => ({
      ...item,
      quantity: (
        (item.color === color || color === null) 
        && (item.size === size || size === null)
      ) ? item.quantity 
        : 0,
    }));
  }, [product.inventory]);
  const [inventory, setInventory] = React.useState<typeof product.inventory>(
    filterInventory(initials.color, initials.size)
  );
  const [selectedColor, setSelectedColor] = React.useState<string | null>(initials.color);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(initials.size);
  let selectedProductKey = (
    inventory.find(
      item => item.color === selectedColor 
      && item.size === selectedSize 
      && item.quantity > 0
    ) || { productKey: null }
  ).productKey;

  const handleSelectColor = React.useCallback((value: string | null) => {
    const _inventory = filterInventory(value, null);
    setInventory(_inventory);
    setSelectedColor(value);
    if (!_inventory.find(item => item.size === selectedSize && item.quantity > 0)) {
      setSelectedSize("");
    }
  }, [selectedSize, filterInventory]);

  const handleSelectSize = React.useCallback((value: string | null) => {
    const _inventory = filterInventory(null, value);
    setInventory(_inventory);
    setSelectedSize(value);
    if (!_inventory.find(item => item.color === selectedColor && item.quantity > 0)) {
      setSelectedColor("");
    }
  }, [selectedColor, filterInventory]);

  const maxAvailability = product.maxAvailability || 10;
  const availability: number = Math.min(
    maxAvailability, 
    inventory.reduce((max, item) => Math.max(max, item.quantity), 0)
  );
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
        { product.categoryBreadcrumbs && (  // If breadcrumbs is not null
          <BreadcrumbNavigation 
            items={product.categoryBreadcrumbs}
          />
        )}

        <InfoPanelTitle>{product.name}</InfoPanelTitle>
        <h4 className="text-base font-bold text-neutral-600">
          {`$${product.price}`}
        </h4>
      </InfoPanel>
      
      <Separator />
      
      <InfoPanel>
        <InfoPanelTitle>{"Color"}</InfoPanelTitle>
        <ColorSelector
          className="w-full"
          items={inventory.map(item => ({ 
            value: item.color, 
            label: item.color,
            color: item.colorHex,
            quiet: item.quantity === 0,
          }))}
          value={selectedColor}
          handleSelect={handleSelectColor}
        />
      </InfoPanel>

      <InfoPanel>
        <InfoPanelTitle>{"Size"}</InfoPanelTitle>
        <SizeSelector 
          items={inventory.map(item => ({
            value: item.size,
            label: item.size,
            quiet: item.quantity === 0,
          }))}
          value={selectedSize}
          handleSelect={handleSelectSize}
        />
      </InfoPanel>

      <InfoPanel>
        <Options 
          className="w-full" 
          availability={availability}
          productKey={selectedProductKey}
          handleAddCart={handleAddCart}
          addCartLoading={addCartLoading}
        />
      </InfoPanel>

      <Separator />

      <InfoPanel>
        <ProductDescription 
          content={product.description} 
        />
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
  React.ComponentPropsWithoutRef<React.ElementType> & {
    availability: number;
    productKey: string | null;
    handleAddCart: (productKey: string, quantity: number) => void;
    addCartLoading: boolean,
  }
> = ({
  availability,
  productKey,
  handleAddCart,
  addCartLoading,
  ...props
}) => {

  const [quantity, setQuantity] = React.useState<number>(1);

  const _handleAddCart = React.useCallback(() => {
    if (productKey) {
      handleAddCart(productKey, quantity);
    }
  }, [productKey, quantity, handleAddCart]);

  return (
    <div
      {...props}
      className={cn(
        "w-full",
        "flex flex-row justify-end items-start gap-xs flex-wrap sm:flex-nowrap",
        props.className
      )}
    >
      <div
        className={cn(
          "w-full",
          "flex flex-row justify-start items-start gap-xs"
        )}
      >
        <Select
          defaultValue={availability < 1 ? "0" : "1"}
          disabled={availability < 1 || !productKey}
          value={quantity.toString()}
          onValueChange={(value) => setQuantity(Number(value))}
        >
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array(availability).fill("").map((_, index) => (
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
          disabled={addCartLoading}
          onClick={_handleAddCart}
        >
          <FaCartPlus />
          Add Cart
        </Button>
      </div>

      <Button
        className="w-full sm:w-fit"
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
  React.ComponentPropsWithoutRef<React.ElementType> & {
    content: string;
  }
> = ({
  content,
  ...props
}) => {
  const markdown = React.useMemo(() => {
    return new MarkdownIt()
  }, []);

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