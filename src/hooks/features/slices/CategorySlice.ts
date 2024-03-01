//external import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

//internal import
import { useFetch } from "../../hooks";
import { CategorySingleType } from "../../../misc/Product";
import { RootState } from "../store/store";

interface initialCategoryType {
  entityCategory: CategorySingleType[];
  loadingCategory: boolean;
  errorCategory: string;
}

// Initial for product is an emplty array
const initialProduct: initialCategoryType = {
  entityCategory: [] as CategorySingleType[],
  loadingCategory: false,
  errorCategory: "" as string,
};

// Create an async thunk to fetch data
export const fetchDataCategory = createAsyncThunk(
  "data/fetchDataCategory",
  async (url: string) => {
    try {
      const response: AxiosResponse<CategorySingleType[]> = await axios.get(
        url
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const CategorySlice = createSlice({
  name: "category",
  initialState: initialProduct,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataCategory.pending, (state) => {
        state.loadingCategory = true;
        state.errorCategory = ""; //clear previous error
      })
      .addCase(fetchDataCategory.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.entityCategory = action.payload as CategorySingleType[];
      })
      .addCase(fetchDataCategory.rejected, (state, action) => {
        state.loadingCategory = false;
        state.errorCategory = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = CategorySlice.actions;

export default CategorySlice.reducer;
