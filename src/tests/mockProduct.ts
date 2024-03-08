// Assuming the path is correct
// product.ts

import { ProductType } from "../misc/Product";

export const mockProductsItem: ProductType[] = [
  {
    id: 1,
    title: "Smart Home Speaker",
    price: 199,
    description: "Revolutionize your home...",
    images: ["https://i.imgur.com/smartSpeaker1.jpg"],
    creationAt: "2024-03-01T10:00:00.000Z",
    updatedAt: "2024-03-02T11:00:00.000Z",
    category: {
      id: 6,
      name: "Electronics",
      image: "https://i.imgur.com/electronicsCat.jpg",
      creationAt: "2024-03-01T10:00:00.000Z",
      updatedAt: "2024-03-02T11:00:00.000Z",
    },
  },
  // Additional products as needed
];
