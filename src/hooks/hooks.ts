import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./features/store/store";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateStateAuthenticaitonToken,
  updateStateCurrentUser,
  updateStateLogin,
} from "./features/slices/UserSlice";
import { UserType, authenticationToken } from "../misc/User";
import { DataBroswerName } from "../misc/BaseVariables";
import { VariantType, enqueueSnackbar } from "notistack";
import { CartType } from "../misc/Cart";
import { updateStateCart } from "./features/slices/CartSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response: AxiosResponse<T[]>) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "An error occurred");
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

const useReduxReducerRunner = (func: Function, params: any[], second?: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(func(...params));
  }, [dispatch, second]);
};
export default useReduxReducerRunner;

// Function to store data in local storage
export const saveDataToStorage = (storageDataName: string, data: any) => {
  try {
    // Convert data to JSON before storing
    const jsonData = JSON.stringify(data);
    localStorage.setItem(storageDataName, jsonData);
  } catch (error) {
    console.error("Error storing data in local storage:", error);
  }
};

// Function to clear data from local storage
export const clearUserStateFromStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing data from local storage:", error);
  }
};

export const useCheckAndLoadDataFromStorage = (broswerNameArray: string[]) => {
  const dispatch = useAppDispatch();

  Object.values(broswerNameArray).forEach((item) => {
    const storedData = localStorage.getItem(item);
    if (storedData) {
      // If data is found in storage, parse it and dispatch action to update Redux state
      const parsedData = JSON.parse(storedData);

      // Dispatch different actions based on the keyName
      switch (item) {
        case DataBroswerName.authenticationStorageToken.keyName:
          // Dispatch action to update token
          dispatch(
            updateStateAuthenticaitonToken(parsedData as authenticationToken)
          );

          break;
        case DataBroswerName.authenticationCurrentUser.keyName:
          // Dispatch action to update current user data
          dispatch(updateStateCurrentUser(parsedData as UserType));

          break;
        case DataBroswerName.isLoggedIn.keyName:
          dispatch(updateStateLogin(parsedData as boolean));
          break;
        case DataBroswerName.cartData.keyName:
          dispatch(updateStateCart(parsedData as CartType));
          break;
        default:
          break;
      }
    }
  });
};

export const handleClickVariantPopUpWindow =
  (message: string, variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return screenWidth;
};
