//external import
import { Box, Button, Fade, Slide, Typography } from "@mui/material";
import React, { useState } from "react";

//internal import
import "../style/Opening.scss";
import useReduxReducerRunner, { useAppSelector } from "../hooks/hooks";
import {
  fetchDataProduct,
  filterProductsByCategories,
} from "../hooks/features/slices/ProductSlice";
import { DataFetchLinkList } from "../misc/BaseVariables";
import { fetchDataCategory } from "../hooks/features/slices/CategorySlice";
import { RootState } from "../hooks/features/store/store";

import "../style/Opening.scss";
const Opening = () => {
  const productState = useAppSelector((state: RootState) => state.products);
  const { loadingProduct, errorProduct, entityProduct } = productState;
  const [showImage, setShowImage] = useState(true);
  const [divDisplay, setDivDisplay] = useState(true); //refresh page does not need opening component -want to test if first visit from user or user does refresh page
  const categoryState = useAppSelector((state: RootState) => state.categories);

  interface textOrderType {
    id: number;
    timeOut: number;
    text: string;
  }

  useReduxReducerRunner(fetchDataProduct, [
    DataFetchLinkList.dataProduct.getAll as any,
  ]);

  const textOrder: textOrderType[] = [
    { id: 1, timeOut: 2000, text: "Welcome to BeeHouse " },
    { id: 2, timeOut: 3000, text: "Fast search with chatGPT" },
    { id: 3, timeOut: 4000, text: "Everything you need with one click" },
    { id: 4, timeOut: 5000, text: "Book, delivery, recieve within 5 minutes" },
  ];

  return (
    <div className="openning__div">
      <div className="openning__fade-image_overlay-content">
        {textOrder.map((item) => {
          return (
            <Slide
              direction="left"
              in
              mountOnEnter
              unmountOnExit
              timeout={item.timeOut}
              key={item.id}
            >
              <Typography variant="h4">{item.text}</Typography>
            </Slide>
          );
        })}
        <Slide direction="down" in mountOnEnter unmountOnExit timeout={6000}>
          <Button
            variant="contained"
            className="openning__fade-image_overlay-content-button"
          >
            <Typography variant="h4">Shop now</Typography>
          </Button>
        </Slide>
      </div>
    </div>
  );
};

export default Opening;
