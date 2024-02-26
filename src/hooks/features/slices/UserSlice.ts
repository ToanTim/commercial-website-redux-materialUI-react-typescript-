import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../../misc/User";

const initialUser: UserType = {
  id: 0,
  email: "",
  password: "",
  name: "",
  role: "",
  avatar: "",
  creationAt: "",
  updatedAt: "",
} satisfies UserType as UserType;

export const userSlice = createSlice({
  //name used to identify slice in the Redux store
  name: "user",
  initialState: initialUser,
  reducers: {
    register: (state) => {
      return console.log("heello");
    },
    login: (state) => {
      console.log("heello");
    },
  },
});

// Action creators are generated for each case reducer function
export const { register, login } = userSlice.actions;

export default userSlice.reducer;
