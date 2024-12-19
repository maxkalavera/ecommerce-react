import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SearchBar = React.forwardRef<HTMLDivElement, Props>((
  {
    className,
    ...props
  }, 
  forwardedRef
) => {
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        className,
        "max-w-80 md:max-w-lg",
        "flex flex-row justify-start items-center gap-2"
      )}
    >
      <div className="relative w-full">
        <FaMagnifyingGlass 
          className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-500 left-3"
        />
        <Input type="text" placeholder="Search" className="pl-8 pr-4 w-full" />
      </div>
      <Button className="px-3 py-2">Search</Button>
    </div>
  )
});

SearchBar.displayName = "SearchBar";

export default SearchBar;