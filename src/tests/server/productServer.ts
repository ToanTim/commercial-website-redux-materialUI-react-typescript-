import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { mockProductsItem } from "../mockProduct";
import { ProductType, ProductTypeSingle } from "../../misc/Product";

export const handler = [
  //Handler for fetching all products
  http.get("https://api.escuelajs.co/api/v1/products", () => {
    return HttpResponse.json(mockProductsItem, { status: 200 });
  }),
  //Handler for creating a new product
  http.post("https://api.escuelajs.co/api/v1/products", async ({ request }) => {
    const product = (await request.json()) as ProductTypeSingle;
    const createdProduct: ProductType = {
      ...product,
      id: 4,
      category: {
        id: 2,
        name: "Electronics",
        image: "https://i.imgur.com/ZANVnHE.jpeg",
        creationAt: "2024-02-29T03:37:26.000Z",
        updatedAt: "2024-02-29T03:37:26.000Z",
      },
      creationAt: "2024-02-29T03:37:26.000Z",
      updatedAt: "2024-02-29T03:37:26.000Z",
    };
    return HttpResponse.json(createdProduct, { status: 201 });
  }),
  //Handler for fetching a single product by id
  http.get(
    "https://api.escuelajs.co/api/v1/products/:id",
    async ({ params }) => {
      const id = Number(params.id);
      const product = mockProductsItem.find((item) => item.id === id);
      return HttpResponse.json(product, { status: 200 });
    }
  ),
  //Handler for updating a product
  http.put("https://api.escuelajs.co/api/v1/products/:id", async () => {
    const product = mockProductsItem[1];
    product.title = "Stylish Notebook";
    return HttpResponse.json(product, { status: 200 });
  }),
  //Handler for for delete product
  http.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    async ({ params }) => {
      const id = Number(params.id);
      const product = mockProductsItem.filter((item) => item.id !== id);
      if (!product) {
        return new HttpResponse(null, { status: 404 });
      }
      mockProductsItem.splice(0, 1);
      return HttpResponse.json(true, { status: 200 });
    }
  ),
];

export const productServer = setupServer(...handler);
