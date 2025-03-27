import { BreadcrumbItems } from "@/components/BreadcrumbNavigation";
import { Category } from "@/types/categories";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toPartialUpperCase (str: string) {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

export function itemizeCategories (category: Category): BreadcrumbItems {
  const items: BreadcrumbItems = [];

  // { content: toPartialUpperCase(category.name), href: `/shop?category=${category.key}` }
  let current: Category | null = category;
  while (current !== null) {
    items.unshift({ 
      content: toPartialUpperCase(current.name), 
      href: `/shop?category=${current.key}` 
    });
    current = current && current.hierarchy.parent;
  }

  return items;
}