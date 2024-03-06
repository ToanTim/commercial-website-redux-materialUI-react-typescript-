import { ProductType } from "./Product";

interface quantityItem {
  itemId: number;
  quantity: number;
}
export interface CartType {
  items: ProductType[];
  quantityPerItem: quantityItem[];
  totalItems: number;
  totalPrice: number;
}
