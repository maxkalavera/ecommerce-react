import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as icons from "react-icons/fa6";
import {
  HamburguerMenu, 
  HamburguerMenuContent, 
  HamburguerMenuDescription, 
  HamburguerMenuFooter, 
  HamburguerMenuHeader, 
  HamburguerMenuItem, 
  HamburguerMenuList, 
  HamburguerMenuTitle, 
  HamburguerMenuTrigger
} from "@/components/cui/hamburguer-menu";
import settings from "@/settings";


const Sidebar: React.FC<
  React.ComponentPropsWithoutRef<typeof HamburguerMenu> & {}
> = ({
  ...props
}) => {
  return (
    <HamburguerMenu {...props}>
      <HamburguerMenuTrigger />
      <HamburguerMenuContent className="w-[250px]">
        <HamburguerMenuHeader className="">
          <HamburguerMenuTitle></HamburguerMenuTitle>
          <HamburguerMenuDescription></HamburguerMenuDescription>
        </HamburguerMenuHeader>

        <HamburguerMenuList className="mt-8 mb-4">
          {settings.content.navigation.map(item => (
            <Link href={item.href} key={item.key} className="w-full">
              <HamburguerMenuItem className="w-full">
                {icons[item.icon as keyof typeof icons] 
                  ? React.createElement(icons[item.icon as keyof typeof icons]) 
                  : null
                }
                <span>{item.label}</span>
              </HamburguerMenuItem>
            </Link>
          ))}
        </HamburguerMenuList>

        <HamburguerMenuFooter></HamburguerMenuFooter>
      </HamburguerMenuContent>
    </HamburguerMenu>
  )
};


Sidebar.displayName = "Sidebar";

export default Sidebar;