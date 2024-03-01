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

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state: RootState) => state.products);
  const categoryState = useAppSelector((state: RootState) => state.categories);
  const [showImage, setShowImage] = useState(true);

  //Fetch initial data for application
  useEffect(() => {
    dispatch(fetchDataProduct(DataFetchLinkList.dataProduct.getAll) as any)
      .then((data: any) => {
        //console.log("Fetched data prodcuts:", data); // Log the fetched data to the console
      })
      .catch((error: any) => {
        //console.error("Error fetching data:", error); // Log any errors to the console
      }); // Dispatch the fetchData action
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataCategory(DataFetchLinkList.dataCategory.getAll) as any)
      .then((data: any) => {
        console.log("Fetched data categories:", data); // Log the fetched data to the console
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error); // Log any errors to the console
      }); // Dispatch the fetchData action
  }, [dispatch]);

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
  }

  if (errorProduct) {
    return <div>Error Product: {errorProduct}</div>;
  }

  //Category
  if (loadingCategory) {
    return <div>Loading...</div>;
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

  return <div className="homepage">This is the content</div>;
};

export default HomeScreen;
