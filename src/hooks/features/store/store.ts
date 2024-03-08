//external
import { combineReducers, configureStore } from "@reduxjs/toolkit";

//internal
import ProductSlice from "../slices/ProductSlice";
import CategorySlice from "../slices/CategorySlice";
import UserSlice from "../slices/UserSlice";
import CartSlice from "../slices/CartSlice";
export const store = configureStore({
  reducer: {
    //read about what is products here mean, is there any rule to name it or random
    products: ProductSlice,
    categories: CategorySlice,
    authentication: UserSlice,
    cart: CartSlice,
  },
});

const rootReducer = combineReducers({
  products: ProductSlice,
  categories: CategorySlice,
  authentication: UserSlice,
  cart: CartSlice,
});

//for testing purposes
export const createTestStore = () => {
  return configureStore({
    reducer: {
      products: ProductSlice,
      categories: CategorySlice,
      authentication: UserSlice,
      cart: CartSlice,
    },
  });
};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;
