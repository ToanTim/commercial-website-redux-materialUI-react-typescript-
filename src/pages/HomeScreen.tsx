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
const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state: RootState) => state.products);
  const categoryState = useAppSelector((state: RootState) => state.categories);
  const [showImage, setShowImage] = useState(true);

  //Fetch initial data for application
  useReduxReducerRunner(fetchDataProduct, [
    DataFetchLinkList.dataProduct.getAll as any,
  ]);
  useReduxReducerRunner(fetchDataCategory, [
    DataFetchLinkList.dataCategory.getAll as any,
  ]);

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
    return <div>Loading...</div>;
  } else {
    console.log("product data:", entityProduct);
  }

  if (errorProduct) {
    return <div>Error Product: {errorProduct}</div>;
  }

  //Category
  if (loadingCategory) {
    return <div>Loading...</div>;
  }

  if (entityCategory) {
    console.log("category data:", entityCategory);
  }

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
