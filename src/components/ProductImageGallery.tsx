import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ResizableImage } from "@/types/types";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {
  images: ResizableImage[],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProductImageGallery = React.forwardRef<HTMLDivElement, Props>((
  {
    images,
    ...props
  }, 
  forwardedRef
) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const onThumbSelected = useCallback(
    (index: number) => {
      if (!api) return
      api.scrollTo(index)
    },
    [api]
  );

  const onSelect = useCallback(() => {
    if (!api) return
    setSelectedIndex(api.selectedScrollSnap())
    api.scrollTo(api.selectedScrollSnap())
  }, [api, setSelectedIndex])

  useEffect(
    () => {
      if (!api) return
      onSelect()
  
      api
        .on('select', onSelect)
        .on('reInit', onSelect)
    }, 
    [api]
  );

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-fit h-fit",
        "flex flex-col justify-start items-start gap-2",
      )}
    >
      <Carousel 
        className={cn(
          "relative w-[350px]",
        )}
        setApi={setApi}
      >
        <CarouselContent>
          {images.map((item: ResizableImage) => (
            <CarouselItem 
              key={item.id}
            >
              <div className="w-full">
                <AspectRatio
                  className="select-none pointer-events-none"
                  ratio={2 / 3}
                >
                  <Image 
                    src={item.image} 
                    alt="Product's image" 
                    fill 
                    className="rounded-md object-cover" 
                  />
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-auto bottom-0 left-1" />
        <CarouselNext className="absolute top-auto bottom-0 right-1" />
      </Carousel>
      <div
        className={cn(
          "w-fit h-fit",
          "grid grid-cols-5 gap-4"
        )}
      >
        {images.map((item: ResizableImage, index: number) => (
          <div
            key={item.id}
            className={cn(
              "w-12 cursor-pointer rounded-md overflow-clip",
              "group outline outline-1 outline-neutral-300 dark:outline-neutral-700",
              selectedIndex === index && "outline outline-1 outline-primary",
            )}
            onClick={() => onThumbSelected(index)}
            
          >
            <AspectRatio
              className="select-none pointer-events-none"
              ratio={2 / 3}
            >
              <Image
                src={item.image}
                alt="Product's image"
                fill
                className="rounded-md object-cover group-hover:scale-110"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  )
});

ProductImageGallery.displayName = "ProductImageGallery";

export default ProductImageGallery;