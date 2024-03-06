import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../../../misc/Cart";
import { ProductType } from "../../../misc/Product";

const initialState: CartType = {
  items: [],
  quantityPerItem: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateStateCart: (state, action: PayloadAction<CartType>) => {
      state.items = action.payload.items;
      state.quantityPerItem = action.payload.quantityPerItem;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },
    addItem: (state, action: PayloadAction<ProductType>) => {
      const { id, price } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        // If item already exists in cart, increase quantity
        state.quantityPerItem[existingItemIndex].quantity++;
      } else {
        // Otherwise, add new item to the cart
        state.items.push(action.payload);
        state.quantityPerItem.push({ itemId: id, quantity: 1 });
      }

      // Update totalItems and totalPrice
      state.totalItems = state.quantityPerItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.quantityPerItem.reduce(
        (total, item, index) =>
          total + item.quantity * state.items[index].price,
        0
      );
    },

    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        // Remove item and quantity from arrays
        state.items.splice(index, 1);
        state.quantityPerItem.splice(index, 1);

        // Update totalItems and totalPrice
        state.totalItems = state.quantityPerItem.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.quantityPerItem.reduce(
          (total, item, index) =>
            total + item.quantity * state.items[index].price,
          0
        );
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ itemId: number; quantity: number }>
    ) => {
      const { itemId, quantity } = action.payload;
      const index = state.items.findIndex((item) => item.id === itemId);

      if (index !== -1) {
        // Update quantity for the specified item
        state.quantityPerItem[index].quantity = quantity;

        // Update totalItems and totalPrice
        state.totalItems = state.quantityPerItem.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.quantityPerItem.reduce(
          (total, item, index) =>
            total + item.quantity * state.items[index].price,
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.quantityPerItem = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  updateStateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
