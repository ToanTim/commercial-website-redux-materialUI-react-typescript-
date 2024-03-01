//external import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

//internal import
import { useFetch } from "../../hooks";
import { CategoryType, ProductType } from "../../../misc/Product";
import { RootState } from "../store/store";

interface initialProductType {
  entityProduct: ProductType[];
  loadingProduct: boolean;
  errorProduct: string;
}

// Initial for product is an emplty array
const initialProduct: initialProductType = {
  entityProduct: [] as ProductType[],
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
  reducers: {},
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
export const {} = productSlice.actions;

export default productSlice.reducer;
