//external import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import type {
  ActionReducerMapBuilder,
  CaseReducer,
  PayloadAction,
} from "@reduxjs/toolkit";

//internal import
import { useFetch } from "../../hooks";
import {
  CategorySingleType,
  ProductByCategory,
  ProductType,
  ProductTypeSingle,
} from "../../../misc/Product";
import { RootState } from "../store/store";
import { TypedActionCreator } from "@reduxjs/toolkit/dist/mapBuilders";
import { DataFetchLinkList } from "../../../misc/BaseVariables";

const initialProductSingle: ProductType = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  images: [],
  creationAt: "",
  updatedAt: "",
  category: {
    id: 0,
    name: "",
    image: "",
    creationAt: "",
    updatedAt: "",
  },
};

interface initialProductType {
  entityProduct: ProductType[];
  entityByCategory: ProductByCategory;
  entityByPriceOrder: ProductType[];
  entityByFilter: ProductType[];
  entityProductById: ProductType;
  loadingProduct: boolean;
  errorProduct: string;
  successProduct: boolean;
}

interface EditProductPayload {
  productId: number;
  newData: Partial<ProductType>;
}

interface DeleteProductPayload {
  productId: number;
}

// Initial for product is an emplty array
const initialProduct: initialProductType = {
  entityProduct: [] as ProductType[],
  entityByCategory: [] as ProductByCategory,
  entityByPriceOrder: [] as ProductType[],
  entityByFilter: [] as ProductType[],
  entityProductById: initialProductSingle,
  loadingProduct: false,
  errorProduct: "" as string,
  successProduct: false,
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

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (payload: EditProductPayload) => {
    const { productId, newData } = payload;
    try {
      const response: AxiosResponse<ProductType> = await axios.put(
        `${DataFetchLinkList.dataProduct.getProductById + productId}`,
        newData
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (payload: DeleteProductPayload) => {
    const { productId } = payload;
    try {
      await axios.delete(
        `${DataFetchLinkList.dataProduct.getProductById + productId}`
      );
      return productId;
    } catch (error) {
      throw error;
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "product/createNewProduct",
  async (newProductData: ProductTypeSingle) => {
    try {
      const response: AxiosResponse<ProductType> = await axios.post(
        DataFetchLinkList.dataProduct.getProductById,
        newProductData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDataProductByFilter = createAsyncThunk(
  "data/fetchDataProductByFilter",
  async (url: string) => {
    try {
      const response: AxiosResponse<ProductType[]> = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDataProductById = createAsyncThunk(
  "data/fetchDataProductById",
  async (url: string) => {
    try {
      const response: AxiosResponse<ProductType> = await axios.get(url);
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
          //only return array of category that has product
          filteredProducts[categoryId] = productsInCategory;
        }
      });

      // Update the state with filtered products
      state.entityByCategory = filteredProducts;
    },
    filterProductsByPriceLowToHigh: (state) => {
      state.entityByPriceOrder = state.entityProduct
        .slice()
        .sort((a, b) => a.price - b.price);
    },
    filterProductsByPriceHighToLow: (state) => {
      state.entityByPriceOrder = state.entityProduct
        .slice()
        .sort((a, b) => b.price - a.price);
    },
    filterProductsByDefault: (state) => {
      state.entityByPriceOrder = state.entityProduct;
    },
    startLoading: (state) => {
      state.loadingProduct = true;
    },
    stopLoading: (state) => {
      state.loadingProduct = false;
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
      })
      .addCase(fetchDataProductById.pending, (state) => {
        state.loadingProduct = true;
        state.errorProduct = ""; //clear previous error
      })
      .addCase(fetchDataProductById.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.entityProductById = action.payload;
      })
      .addCase(fetchDataProductById.rejected, (state, action) => {
        state.loadingProduct = false;
        state.errorProduct = action.error.message ?? "Unknown error";
      })
      .addCase(fetchDataProductByFilter.pending, (state) => {
        state.loadingProduct = true;
        state.errorProduct = ""; //clear previous error
      })
      .addCase(fetchDataProductByFilter.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.entityByFilter = action.payload as ProductType[];
      })
      .addCase(fetchDataProductByFilter.rejected, (state, action) => {
        state.loadingProduct = false;
        state.errorProduct = action.payload as string;
      })

      //handle edit product
      .addCase(editProduct.pending, (state) => {
        state.loadingProduct = true;
        state.successProduct = false;
        state.errorProduct = ""; // Clear previous error
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        // Update the product in the state with the edited data
        const editedProductIndex = state.entityProduct.findIndex(
          (product) => product.id === action.payload.id
        );
        if (editedProductIndex !== -1) {
          state.entityProduct[editedProductIndex] = action.payload;
        }
        state.successProduct = true;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.successProduct = false;
        state.errorProduct = action.error.message ?? "Unknown error";
      })
      // Handle deleteProduct thunk
      .addCase(deleteProduct.pending, (state) => {
        state.loadingProduct = true;
        state.loadingProduct = false;
        state.errorProduct = ""; // Clear previous error
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        // Remove the deleted product from the state
        state.entityProduct = state.entityProduct.filter(
          (product) => product.id !== action.payload
        );
        state.loadingProduct = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.loadingProduct = false;
        state.errorProduct = action.error.message ?? "Unknown error";
      })
      //Handle product creation
      .addCase(createNewProduct.pending, (state) => {
        state.loadingProduct = true;
        state.loadingProduct = false;
        state.errorProduct = ""; // Clear previous error
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        if (action.payload) {
          state.entityProduct.push(action.payload);
        }
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.loadingProduct = false;
        state.errorProduct = action.error.message ?? "Unknown error";
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  filterProductsByCategories,
  filterProductsByPriceLowToHigh,
  filterProductsByPriceHighToLow,
  filterProductsByDefault,
  startLoading,
  stopLoading,
} = productSlice.actions;

export default productSlice.reducer;
