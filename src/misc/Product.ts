import { Category } from "@mui/icons-material";

export interface CategoryType {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: CategoryType;
}

export interface ProductByCategory {
  [categoryId: number]: ProductType[];
}

export type CategorySingleType = Pick<CategoryType, "id" | "name" | "image">;

export interface ProductTypeSingle {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
}
