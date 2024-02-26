import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import { fetchDataProduct } from "../hooks/features/slices/ProductSlice";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
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
  }

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default HomeScreen;
