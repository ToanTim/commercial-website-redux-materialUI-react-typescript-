import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryType, ProductType } from "../../../misc/Product";
import { RootState } from "../store/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useFetch } from "../../hooks";
import axios, { AxiosResponse } from "axios";

interface initialProductType {
  entities: ProductType[];
  loading: boolean;
  error: string;
}

// Initial for product is an emplty array
const initialProduct: initialProductType = {
  entities: [] as ProductType[],
  loading: false,
  error: "" as string,
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
        state.loading = true;
        state.error = ""; //clear previous error
      })
      .addCase(fetchDataProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload as ProductType[];
      })
      .addCase(fetchDataProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = productSlice.actions;

export default productSlice.reducer;
