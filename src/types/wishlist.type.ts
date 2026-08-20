import type { ProductType } from "@/types/products.type";

export type WishlistResponse = {
  message: string;
  products: ProductType[];
};