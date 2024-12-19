"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCircleHalfStroke, FaMoon, FaSpinner, FaSun } from "react-icons/fa6";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useTheme } from "next-themes";

interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {}

const ThemeButton = React.forwardRef<any, Props>((props, forwardedRef) => {
  const { theme, setTheme } = useTheme()
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // To use the button only after the first render
    // This to allow the server and render have the same 
    // content in the first render
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Menubar className="border-none w-8 h-7 p-0">
        <MenubarMenu>
          <MenubarTrigger
            disabled={true}
            className="text-sm"
          >
            <FaSpinner 
              className='animate-spin'
              rotate='true' 
            />
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    )
  }

  return (
    <Menubar className="border-none w-8 h-7 p-0">
      <MenubarMenu>
        <MenubarTrigger
          className="text-sm w-fit h-fit px-2 py-1 border-none"
        >
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
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem onClick={() => setTheme('system')}>
            System
          </MenubarItem>
          <MenubarItem onClick={() => setTheme('light')}>
            Light
          </MenubarItem>
          <MenubarItem onClick={() => setTheme('dark')}>
            Dark
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
})

ThemeButton.displayName = 'ThemeButton';

export default ThemeButton