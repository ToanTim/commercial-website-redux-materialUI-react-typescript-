//external
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Fade, Typography } from "@mui/material";

//internal
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import { fetchDataProduct } from "../hooks/features/slices/ProductSlice";
import "../style/HomeScreen.scss";
import { DataFetchLinkList } from "../misc/BaseVariables";
import { fetchDataCategory } from "../hooks/features/slices/CategorySlice";
import useReduxReducerRunner from "../hooks/hooks";
import LoadingScreen from "./LoadingScreen";
const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state: RootState) => state.products);
  const categoryState = useAppSelector((state: RootState) => state.categories);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.authentication.loggedIn
  );
  const curentUserData = useAppSelector(
    (state: RootState) => state.authentication.entityCurrentUser
  );
  const accessToken = useAppSelector(
    (state: RootState) => state.authentication.accessToken
  );
  const [showImage, setShowImage] = useState(true);

  //incase of not yet have state ready
  if (!productState) {
    return <div>Loading...</div>;
  }

  if (!categoryState) {
    return <div>Loading...</div>;
  }

  //Loading and error handling
  const { loadingProduct, errorProduct, entityProduct } = productState;
  const { loadingCategory, errorCategory, entityCategory } = categoryState;

  //Product
  if (loadingProduct) {
    return <LoadingScreen></LoadingScreen>;
  }

  if (errorProduct) {
    return <div>Error Product: {errorProduct}</div>;
  }

  //Category
  if (loadingCategory) {
    return <div>Loading...</div>;
  }

  /* console.log("Login in", isLoggedIn);
  console.log("accessToken", accessToken);

  if (curentUserData) {
    console.log("curentUserData", curentUserData);
  } */

  if (errorCategory) {
    return <div>Error Category: {errorCategory}</div>;
  }

  const handleClick = () => {
    setShowImage(false);
    setTimeout(() => {
      setShowImage(true);
    }, 2000); // fade out for 2 seconds
  };

  return (
    <div className="homepage">
      {entityCategory.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
};

export default HomeScreen;
