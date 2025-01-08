"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCircleHalfStroke, FaMoon, FaSpinner, FaSun } from "react-icons/fa6";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SelectArrow, SelectIcon } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {}

const ThemeButton = React.forwardRef<any, Props>((props, forwardedRef) => {
  const { theme, setTheme } = useTheme()
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // To use the button only after the first render
    // This to allow the server and render have the same 
    // content in the first render
    setLoading(false)
  }, []);

  if (loading) {
    return (
      <Select>
        <SelectTrigger 
          disabled={true}
          className={cn(
            "text-sm w-fit h-fit px-2 py-1",
            "flex flex-row justify-center items-center gap-1",
            "border-none focus:ring-transparent select-none"
          )}
        >
          <FaSpinner 
            className='animate-spin'
            rotate='true' 
          />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select
      value={theme}
      onValueChange={setTheme}
    >
      <SelectTrigger className={cn(
        "text-sm w-fit h-fit px-2 py-1",
        "flex flex-row justify-center items-center gap-1",
        "border-none focus:ring-transparent select-none"
      )}>
        <SelectIcon>
          {((() => {
            if (theme === 'light') {
              return (
                <FaSun />
              )
            } else if (theme === 'dark') {
              return (
                <FaMoon />
              )
            } else {
              return (
                <FaCircleHalfStroke />
              )
            }
          })())}
        </SelectIcon>
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
})

ThemeButton.displayName = 'ThemeButton';

export default ThemeButton