import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const SearchBar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Input> & {
    onSend?: React.MouseEventHandler<HTMLButtonElement>
  }
>((
  {
    onSend=undefined,
    ...props
  }, 
  forwardedRef
) => {
  return (
    <div
      ref={forwardedRef}
      className={cn(
        "max-w-80 md:max-w-lg",
        "flex flex-row justify-start items-center gap-2",
        props.className
      )}
    >
      <div className="relative w-full">
        <FaMagnifyingGlass 
          className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-500 left-3"
        />
        <Input
          {...props}
          className="pl-8 pr-4 w-full"
          type="text" 
          placeholder="Search"
        />
      </div>
      <Button 
        className="px-3 py-2"
        onClick={onSend}
      >
        Search
      </Button>
    </div>
  )
});

SearchBar.displayName = "SearchBar";

export default SearchBar;