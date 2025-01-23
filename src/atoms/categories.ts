import { atom } from 'jotai';
import categoriesData from "@/assets/mock/categories.json";
import { Category } from '@/types/types';


export const tabsAtom = atom<Category[]>([
  {
    "referenceKey": "YgMVlkiMSs",
    "name": "Women",
  },
  {
    "referenceKey": "rdvc3N3wO",
    "name": "Men",
  }
])

export const activeTabAtom = atom<string>("YgMVlkiMSs");

export const activeTabCategoriesAtom = atom(async (get) => {
  const rootCategory = get(activeTabAtom);
  return categoriesData.filter(
      (category) => category.hierarchy.parents.some(parent => parent.referenceKey === rootCategory));
});

export const activeTabProductsFiltersAtom = atom<string>("");

export const activeTabCategoriesProductsFiltersAtom = atom(async (get) => {
  const rootCategory = get(activeTabProductsFiltersAtom);
  return categoriesData.filter(
      (category) => category.hierarchy.parents.some(parent => parent.referenceKey === rootCategory));
});
