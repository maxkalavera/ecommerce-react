import { Product as ProductType } from "@/types/types";
import { PrimitiveAtom, useAtomValue } from "jotai";

export const useProduct = (atom: PrimitiveAtom<any>, id: string) => {
  const productsData = useAtomValue(atom);
  return productsData.items.find((item: ProductType) => item.id === id);
}