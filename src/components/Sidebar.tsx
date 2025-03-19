import React from "react";
import { cn } from "@/lib/utils";
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
import { FaHashtag, FaShirt, FaTag } from "react-icons/fa6";

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
          <HamburguerMenuItem><FaHashtag /> <h4>Women</h4></HamburguerMenuItem>
          <HamburguerMenuItem><FaHashtag /> <h4>Men</h4></HamburguerMenuItem>
          <HamburguerMenuItem><FaShirt /> <h4>New Arrivals</h4></HamburguerMenuItem>
          <HamburguerMenuItem><FaTag /> <h4>Sale</h4></HamburguerMenuItem>
        </HamburguerMenuList>

        <HamburguerMenuFooter></HamburguerMenuFooter>
      </HamburguerMenuContent>
    </HamburguerMenu>
  )
};


Sidebar.displayName = "Sidebar";

export default Sidebar;