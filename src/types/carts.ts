import { Instance } from "@/types/commons";
import { Product } from "@/types/products";


export interface CartItem extends Instance {
  quantity: number;
  unitPrice: number;
    product: Product;
}