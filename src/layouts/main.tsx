import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import React from "react";
import document from "@/layouts/document";


const MainLayout = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {}
>((
  {
    children,
    ...props
  }, 
  forwardedRef
) => {
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full h-fit",
        "flex flex-col justify-start items-center"
      )}
    >
      <Header 
        className="max-w-screen-lg"
      />
      <document.Frame
        {...props}
      >
        <div
          className="w-full h-fit"
        >
          {children}
        </div>
      </document.Frame>
      <Footer className="max-w-screen-lg mt-12" />
    </div>
  )
});

MainLayout.displayName = "MainLayout";

export default MainLayout;