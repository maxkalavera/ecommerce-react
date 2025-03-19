'use client';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import InfiniteScroll, { InfiniteScrollProps } from "@/components/ui/infinite-scroll";
import { Button } from "@/components/ui/button";
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
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  useImperativeHandle(forwardedRef, () => scrollWrapperRef.current!, [])
  const [state, setState] = useState({
    hasScrollLeft: false,
    hasScrollRight: true,
  });

  const scrollStepLeft = useCallback(() => {
    if (scrollableRef.current) {
      const scrollable = scrollableRef.current;
      if (scrollable) {
        scrollable.scrollBy({
          left: - scrollable.clientWidth,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const scrollStepRight = useCallback(() => {
    if (scrollableRef.current) {
      const scrollable = scrollableRef.current;
      if (scrollable) {
        scrollable.scrollBy({
          left: scrollable.clientWidth,
          behavior: "smooth",
        });
      }
    }
  }, [])

  const updateScrollStateRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (scrollWrapperRef.current) {
      const scrollable = scrollableRef.current = scrollWrapperRef.current.getElementsByTagName('div')[0];
      if (updateScrollStateRef.current !== null) {
        scrollable.removeEventListener('scroll', updateScrollStateRef.current);
      }
      updateScrollStateRef.current = () => {
        setState({
          hasScrollLeft: scrollable.scrollLeft > 0,
          hasScrollRight: scrollable.clientWidth + scrollable.scrollLeft < scrollable.scrollWidth,
        })
      }
      scrollable.addEventListener('scroll', updateScrollStateRef.current);
      updateScrollStateRef.current();
    }
  }, [children]);

  return (
    <ScrollArea 
      {...props}
      ref={scrollWrapperRef}
      className={cn(
        "relative z-0 group/horizontal-scroll-area",
        "whitespace-nowrap rounded-md",
        props.className
      )}
    >
      { state.hasScrollLeft && (
        <Button
          size="lg"
          variant="secondary"
          className={cn(
            "absolute left-xs bottom-0 top-0 my-auto z-50 px-xs py-sm sm:py-md",
            "bg-neutral-100 border-[1px] border-neutral-300  hover:bg-neutral-200 shadow-md",
          )}
          disabled={!state.hasScrollLeft}
          onClick={scrollStepLeft}
        >
          <FaCaretLeft />
        </Button>
      )}

      { (state.hasScrollRight || hasMore) && (
        <Button
          size="lg"
          variant="secondary"
          className={cn(
            "absolute right-xs bottom-0 top-0 my-auto z-50 px-xs py-sm sm:py-md",
            "bg-neutral-100 border-[1px] border-neutral-300  hover:bg-neutral-200 shadow-md",
          )}
          disabled={!hasMore && !state.hasScrollRight}
          onClick={scrollStepRight}
        >
          <FaCaretRight />
        </Button>
      )}

      <div
        className={cn(
          "w-full flex flex-row justify-start items-center gap-sm p-sm",
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
