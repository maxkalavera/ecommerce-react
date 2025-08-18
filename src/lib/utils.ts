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
