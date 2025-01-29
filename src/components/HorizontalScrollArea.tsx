'use client';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import InfiniteScroll, { InfiniteScrollProps } from "@/components/ui/infinite-scroll";
import { Button } from "./ui/button";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";


const HorizontalScrollArea = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<React.ElementType> &
  InfiniteScrollProps & {

  }
>((
  {
    children,
    isLoading,
    hasMore,
    next,
    ...props
  }, 
  forwardedRef
) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardedRef, () => scrollAreaRef.current!, [])
  const [state, setState] = useState({
    hasScrollLeft: false,
    hasScrollRight: true,
  });

  const scrollStepLeft = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollable = scrollAreaRef.current.getElementsByTagName('div')[0];
      if (scrollable) {
        scrollable.scrollBy({
          left: -scrollAreaRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const scrollStepRight = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollable = scrollAreaRef.current.getElementsByTagName('div')[0];
      if (scrollable) {
        scrollable.scrollBy({
          left: scrollAreaRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollable = scrollAreaRef.current.getElementsByTagName('div')[0];
      const updateScrollState = () => {
        setState({
          hasScrollLeft: scrollable.scrollLeft > 0,
          hasScrollRight: scrollable.scrollLeft < scrollable.scrollWidth,
        })
      }
      scrollable.addEventListener('scroll', updateScrollState);
      updateScrollState();
    }
  }, []);

  return (
    <ScrollArea 
      {...props}
      ref={scrollAreaRef}
      className={cn(
        "relative z-0 group/horizontal-scroll-area",
        "whitespace-nowrap rounded-md",
        props.className
      )}
    >
      { state.hasScrollLeft && (
        <Button
          size="sm"
          variant="secondary"
          className={cn(
            "absolute left-[2px] bottom-0 top-0 my-auto z-50 px-2 py-6",
            "shadow-lg",
          )}
          disabled={!state.hasScrollLeft}
          onClick={scrollStepLeft}
        >
          <FaCaretLeft />
        </Button>
      )}

      { state.hasScrollRight && hasMore && (
        <Button
          size="sm"
          variant="secondary"
          className={cn(
            "absolute right-[2px] bottom-0 top-0 my-auto z-50 px-2 py-6",
            "shadow-lg",
          )}
          disabled={!hasMore || !state.hasScrollRight}
          onClick={scrollStepRight}
        >
          <FaCaretRight />
        </Button>
      )}

      <div
        className={cn(
          "w-full flex flex-row justify-start items-center gap-2 space-x-4 p-4",
        )}
      >
        {children}
        <InfiniteScroll 
          hasMore={hasMore} 
          isLoading={isLoading} 
          next={next} 
          threshold={0.5}
          {...props}
        >
          {hasMore && (
            <span>Loading</span>
          )}
        </InfiniteScroll>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
});

HorizontalScrollArea.displayName = "HorizontalScrollArea";

export default HorizontalScrollArea;
