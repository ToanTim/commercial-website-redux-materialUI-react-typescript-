import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";

import axios from "axios";

// Import the necessary types/interfaces

import { RootState } from "../hooks/features/store/store";
import { AnyAction } from "@reduxjs/toolkit";
import { CategorySingleType, ProductType } from "../misc/Product";
import {
  productSlice,
  fetchDataProduct,
  fetchDataProductById,
  fetchDataProductByFilter,
  editProduct,
  deleteProduct,
  createNewProduct,
  filterProductsByCategories,
} from "../hooks/features/slices/ProductSlice";

// Type for mock store dispatch
type DispatchExts = ThunkDispatch<any, any, AnyAction>;

// Create a mock Redux store
const mockStore = configureStore<RootState, DispatchExts>([thunk]);

describe("productSlice", () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore();
  });

  test("fetchDataProduct thunk dispatches correct actions", async () => {
    const mockProductData: ProductType[] = [
      {
        id: 1,
        title: "Smartphone",
        price: 599,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: ["smartphone1.jpg", "smartphone2.jpg"],
        creationAt: "2022-03-10T12:00:00Z",
        updatedAt: "2022-03-10T12:00:00Z",
        category: {
          id: 1,
          name: "Electronics",
          image: "electronics.jpg",
          creationAt: "2022-03-10T12:00:00Z",
          updatedAt: "2022-03-10T12:00:00Z",
        },
      },
    ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockProductData,
    });

    await store.dispatch(fetchDataProduct("some-url"));

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: fetchDataProduct.pending.type },
      { type: fetchDataProduct.fulfilled.type, payload: mockProductData },
    ]);
  });

  // Similar tests for other async thunks like fetchDataProductById, fetchDataProductByFilter, editProduct, deleteProduct, createNewProduct

  test("filterProductsByCategories reducer updates state correctly", () => {
    const initialState = productSlice.reducer(undefined, { type: "unknown" });
    const categoryData: CategorySingleType[] = [
      {
        id: 1,
        name: "Category 1",
        image: "image-url",
      },
    ];
    const action = {
      type: filterProductsByCategories.type,
      payload: categoryData,
    };

    const nextState = productSlice.reducer(initialState, action);

    // Ensure state is updated correctly
    expect(nextState.entityByCategory[1]).toEqual([]);
    expect(nextState.loadingProduct).toBe(false);
  });

  // Write tests for other reducers like filterProductsByPriceLowToHigh, filterProductsByPriceHighToLow, filterProductsByDefault, startLoading, stopLoading

  // Write tests for other action creators
});
