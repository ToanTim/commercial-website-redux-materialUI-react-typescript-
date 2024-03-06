//external
import { configureStore } from "@reduxjs/toolkit";

//internal
import ProductSlice from "../slices/ProductSlice";
import CategorySlice from "../slices/CategorySlice";
import UserSlice from "../slices/UserSlice";
export const store = configureStore({
  reducer: {
    //read about what is products here mean, is there any rule to name it or random
    products: ProductSlice,
    categories: CategorySlice,
    authentication: UserSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
