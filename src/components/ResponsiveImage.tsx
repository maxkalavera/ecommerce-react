import React from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import NextImage from "next/image";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


export const ResponsiveImageBox = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    children: typeof Image;
    ratio: number;
  }
>((
  {
    children,
    ratio,
    ...props
  }, 
  forwardedRef
) => {


  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        " overflow-clip",
        props.className
      )}
    >
      <AspectRatio
        className="select-none"
        ratio={ratio}
      >
        { children }
      </AspectRatio>
    </div>
  );
});

ResponsiveImageBox.displayName = "ResponsiveImageBox";


export const ResponsiveImage: React.FC<
  React.ComponentPropsWithoutRef<typeof NextImage> & {}
> = ({
  ...props
}) => {
  const [isError, setIsError] = React.useState(false);

  if (isError) {
    return (
      <div
        className={cn(
          "w-full h-full",
          "border-solid border-[1px] border-red-200 rounded-md",
          "bg-white",
          "flex flex-row justify-center items-center gap-0",
          props.className
        )}
      >
        <ExclamationTriangleIcon className="w-8 h-8 text-red-200" />
      </div>
    )
  }

  return (
    <NextImage
      {...props}
      className={cn(
        "pointer-events-none",
        props.className
      )}
      fill
      onError={(...args) => {
        setIsError(true);
        props.onError && props.onError(...args);
      }}
    />
  );
};

ResponsiveImage.displayName = "ResponsiveImage";