import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UserProfileType,
  UserRegisterType,
  UserType,
  authenticationToken,
  userLoginType,
} from "../../../misc/User";
import axios, { AxiosResponse } from "axios";

// not yet implemented, implement later with types for safty
const initialUserValue: UserType = {
  id: 0,
  email: "",
  password: "",
  name: "",
  role: "",
  avatar: "",
  creationAt: "",
  updatedAt: "",
};

interface initialUserType {
  entityCurrentUser: UserType;
  accessToken: string;
  refreshToken: string;
  loggedIn: boolean;
  loadingUser: boolean;
  errorUser: string;
}

// Initial for product is an emplty array
const initialUser: initialUserType = {
  entityCurrentUser: initialUserValue,
  accessToken: "",
  refreshToken: "",
  loggedIn: false,
  loadingUser: false,
  errorUser: "" as string,
};

export const userLoginAsuncThunk = createAsyncThunk(
  "data/userLogin",
  async ({ url, bodyData }: { url: string; bodyData: userLoginType }) => {
    try {
      const response: AxiosResponse<authenticationToken> = await axios.post(
        url,
        bodyData
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const userRegisterAsuncThunk = createAsyncThunk(
  "data/userRegister",
  async ({ url, bodyData }: { url: string; bodyData: UserProfileType }) => {
    try {
      const response: AxiosResponse<UserRegisterType> = await axios.post(
        url,
        bodyData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create an async thunk to fetch data
export const fetchCurrentUserDataByToken = createAsyncThunk(
  "data/fetchUserProfileWithToken",
  async ({ url, accessToken }: { url: string; accessToken: string }) => {
    try {
      const response: AxiosResponse<UserRegisterType> = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add Authorization header
        },
      });
      console.log("current user data from redux", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  //name used to identify slice in the Redux store
  name: "user",
  initialState: initialUser,
  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.accessToken = "";
      state.refreshToken = "";
      state.entityCurrentUser = initialUserValue;
    },
    updateStateLogin: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    updateStateCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.entityCurrentUser = action.payload;
    },
    updateStateAuthenticaitonToken: (
      state,
      action: PayloadAction<authenticationToken>
    ) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
  },
  extraReducers: (builder) => {
    builder

      //user login to get token
      .addCase(userLoginAsuncThunk.pending, (state) => {
        state.loggedIn = false;
        state.loadingUser = true;
        state.errorUser = ""; //clear previous error and token
        state.accessToken = "";
        state.refreshToken = "";
      })
      .addCase(userLoginAsuncThunk.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.loggedIn = true;
        state.refreshToken = action.payload.refresh_token as string;
        state.accessToken = action.payload.access_token as string;
      })
      .addCase(userLoginAsuncThunk.rejected, (state, action) => {
        state.loggedIn = false;
        state.loadingUser = false;
        state.errorUser = action.error.message as string;
      })

      //Get user data by token
      .addCase(fetchCurrentUserDataByToken.pending, (state) => {
        state.loadingUser = true;
        state.errorUser = ""; //clear previous error
      })
      .addCase(fetchCurrentUserDataByToken.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.entityCurrentUser = action.payload as UserType;
      })
      .addCase(fetchCurrentUserDataByToken.rejected, (state, action) => {
        state.loadingUser = false;
        state.errorUser = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  logout,
  updateStateAuthenticaitonToken,
  updateStateLogin,
  updateStateCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
