import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import { fetchDataProduct } from "../hooks/features/slices/ProductSlice";
import Header from "../components/Header";
import { Box, Button, Container, Fade, Typography } from "@mui/material";
import "../style/HomeScreen.scss";
import pictureTest from "./test.jpg";
const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state: RootState) => state.products);
  const [showImage, setShowImage] = useState(true);
  /* useEffect(() => {
    dispatch(
      fetchDataProduct("https://api.escuelajs.co/api/v1/products") as any
    )
      .then((data: any) => {
        console.log("Fetched data:", data); // Log the fetched data to the console
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error); // Log any errors to the console
      }); // Dispatch the fetchData action
  }, [dispatch]);

  if (!productState) {
    return <div>Loading...</div>;
  }

  const { loading, error, entities } = productState;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  } */

  const handleClick = () => {
    setShowImage(false);
    setTimeout(() => {
      setShowImage(true);
    }, 2000); // fade out for 2 seconds
  };

  return <div className="homepage">This is the content</div>;
};

export default HomeScreen;
