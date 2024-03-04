//external import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

//internal import
import { useFetch } from "../../hooks";
import {
  CategorySingleType,
  ProductByCategory,
  ProductType,
} from "../../../misc/Product";
import { RootState } from "../store/store";

interface initialProductType {
  entityProduct: ProductType[];
  entityByCategory: ProductByCategory;
  loadingProduct: boolean;
  errorProduct: string;
}

// Initial for product is an emplty array
const initialProduct: initialProductType = {
  entityProduct: [] as ProductType[],
  entityByCategory: [] as ProductByCategory,
  loadingProduct: false,
  errorProduct: "" as string,
};

// Create an async thunk to fetch data
export const fetchDataProduct = createAsyncThunk(
  "data/fetchDataProduct",
  async (url: string) => {
    try {
      const response: AxiosResponse<ProductType[]> = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: initialProduct,
  reducers: {
    filterProductsByCategories: (
      state,
      action: PayloadAction<CategorySingleType[]>
    ) => {
      const categoryIds: number[] = action.payload.map(
        (category) => category.id
      );
      const filteredProducts: ProductByCategory = {};

      // Loop through each category ID
      categoryIds.forEach((categoryId) => {
        // Filter products by the current category ID
        const productsInCategory = state.entityProduct.filter(
          (productItem) => productItem.category.id === categoryId
        );

        // Assign filtered products to the category ID in the result object
        if (productsInCategory.length > 0) {
          filteredProducts[categoryId] = productsInCategory;
        }
      });

      // Update the state with filtered products
      state.entityByCategory = filteredProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataProduct.pending, (state) => {
        state.loadingProduct = true;
        state.errorProduct = ""; //clear previous error
      })
      .addCase(fetchDataProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.entityProduct = action.payload as ProductType[];
      })
      .addCase(fetchDataProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.errorProduct = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const { filterProductsByCategories } = productSlice.actions;

export default productSlice.reducer;
