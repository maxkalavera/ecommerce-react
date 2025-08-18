import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import DisplayImage from "@/assets/images/home_hero.jpg"


const Hero = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & { a: number }
>((
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
        "w-full h-[520px]",
        props.className
      )}
    >
      <div
        className={cn(
          "absolute",
          "w-full h-[calc(520px_-_32px)] z-10",
          "flex flex-col justify-start items-center",
        )}
      >
        {props.children}
      </div>

      <Image 
        className="absolute top-0 left-0 z-0 object-cover"
        alt="Hero section display's image"
        src={DisplayImage}
        fill
        sizes="(min-width: 1280px) 1280px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, 640px"
        priority={true}
      />
    </div>
  )
});

Hero.displayName = "Base";

export default Hero;