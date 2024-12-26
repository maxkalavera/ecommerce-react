import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import React from "react";
import document from "@/layouts/document";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainLayout = React.forwardRef<HTMLDivElement, Props>((
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
      <Footer />
    </div>
  )
});

MainLayout.displayName = "MainLayout";

export default MainLayout;