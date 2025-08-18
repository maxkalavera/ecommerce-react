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
import { type Image as ImageType } from "@/types/commons";


const ImageGallery = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    images: ImageType[];
  }
>((
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
      api.scrollTo(index);
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
    [api, onSelect]
  );

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full h-fit",
        "flex flex-col justify-start items-start gap-2",
        props.className,
      )}
    >
      <CarouselDisplay 
        images={images}
        setApi={setApi}
      />

      <Thumbnails
        images={images}
        selectedIndex={selectedIndex}
        onThumbSelected={onThumbSelected}
      />
    </div>
  )
});

ImageGallery.displayName = "ImageGallery";

export default ImageGallery;


/******************************************************************************
 * Secondary components
 */


const CarouselDisplay: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    images: ImageType[];
    setApi: ((api: CarouselApi) => void);
  }
> = ({
  images,
  setApi,
  ...props
}) => {
  return (
    <Carousel 
      {...props}
      className={cn(
        "relative w-full",
        props.className
      )}
      setApi={setApi}
    >
      <CarouselContent>
        {images.map((item: ImageType) => (
          <CarouselItem 
            key={item.key}
          >
            <div className="w-full">
              <AspectRatio
                className="select-none pointer-events-none"
                ratio={2 / 3}
              >
                <Image 
                  src={item.url} 
                  alt="Product's image" 
                  fill 
                  className="rounded-md object-cover" 
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious 
        className={cn(
          "absolute top-auto bottom-0 left-2",
          "rounded-md bg-neutral-800 text-neutral-100 border-[1px] border-neutral-500",
          "hover:bg-neutral-800 hover:text-neutral-100 hover:border-[1px] hover:border-neutral-300"
        )}

      />
      <CarouselNext 
        className={cn(
          "absolute top-auto bottom-0 right-2",
          "rounded-md bg-neutral-800 text-neutral-100 border-[1px] border-neutral-500",
          "hover:bg-neutral-800 hover:text-neutral-100 hover:border-[1px] hover:border-neutral-300"
        )} 
      />
    </Carousel>
  );
};


const Thumbnails: React.FC<
  React.ComponentPropsWithoutRef<React.ElementType> & {
    images: ImageType[];
    selectedIndex: number;
    onThumbSelected: (index: number) => void;
  }
> = ({
  images,
  selectedIndex,
  onThumbSelected,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full h-fit",
        "grid grid-cols-3 gap-4",
        props.className
      )}
    >
      {images.map((item: ImageType, index: number) => (
        <div
          key={item.key}
          className={cn(
            "w-full cursor-pointer rounded-sm overflow-clip",
            "group outline outline-1 outline-neutral-300",
            selectedIndex === index && "outline outline-2 outline-neutral-900",
          )}
          onClick={() => onThumbSelected(index)}
        >
          <AspectRatio
            className="select-none pointer-events-none"
            ratio={2 / 3}
          >
            <Image
              src={item.url}
              alt="Product's image"
              fill
              className="rounded-sm object-cover group-hover:scale-110"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  );
};
