import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { mockCartItem } from "../mockCart";

export const handler = [
  //Handler for fetching all categories
  http.get("https://api.escuelajs.co/api/v1/categories", () => {
    return HttpResponse.json(mockCartItem, { status: 200 });
  }),
];

export const categoryServer = setupServer(...handler);
