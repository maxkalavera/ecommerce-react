import { cn } from "@/lib/utils";
import React from "react";
import DisplayImage from "@/assets/images/home_hero.jpg"
import Image from "next/image";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Hero = React.forwardRef<HTMLDivElement, Props>((
  {
    ...props
  }, 
  forwardedRef
) => {
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "relative",
        "w-full px-4 py-8 md:p-4 md:h-[520px] overflow-clip",
        "border-t-[1px] border-b-[1px] border-neutral-300",
        "flex flex-col md:flex-row justify-center items-center gap-16 md:gap-4",
        props.className
      )}
    >
      <div
        data-label="hero-content"
        className={cn(
          "w-full max-w-80 md:w-80 h-full z-10",
          "flex flex-col justify-center items-center gap-2",
          "select-none"
        )}
      >
        <h1 className="font-bold text-2xl text-neutral-950">
          Apparel Store
        </h1>
        <h4 className="font-serif font-normal text-lg text-neutral-950 text-center">
          Catchy phrase, possibly something emotional 
        </h4>
        <div
          className={cn(
            "w-fit h-fit",
            "flex flex-row justify-start items-end gap-2"
          )}
        >
          <Button className="mt-4">
            For women
          </Button>
          <Button className="mt-4">
            For Men
          </Button>
        </div>
      </div>

      <Image 
        className="absolute top-0 left-0 z-0 object-cover dark:opacity-90"
        alt="Hero section display's image"
        src={DisplayImage}
        fill
        sizes="100vw"
        priority={true}
      />
    </div>
  )
});

Hero.displayName = "Hero";

export default Hero;
