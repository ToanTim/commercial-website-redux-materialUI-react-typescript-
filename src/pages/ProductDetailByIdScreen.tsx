import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Divider,
} from "@mui/material";

import { ProductType } from "../misc/Product";
import { useNavigate, useParams } from "react-router-dom";
import defaultProductPicture from "../components/pictures/default_product_image.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper/modules";
import "../style/ProductDetailByIdScreen.scss";
import { DataFetchLinkList, websiteRouterList } from "../misc/BaseVariables";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import useReduxReducerRunner, {
  handleClickVariantPopUpWindow,
  useAppDispatch,
  useAppSelector,
} from "../hooks/hooks";
import { fetchDataProductById } from "../hooks/features/slices/ProductSlice";
import { RootState } from "../hooks/features/store/store";
import ErrorScreen from "./ErrorScreen";
import { useSelector } from "react-redux";
import { addItem } from "../hooks/features/slices/CartSlice";

const ProductDetailByIdScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.authentication.loggedIn
  );
  const entityProductById = useSelector(
    (state: RootState) => state.products.entityProductById
  );
  const loading = useSelector(
    (state: RootState) => state.products.loadingProduct
  );
  const error = useSelector((state: RootState) => state.products.errorProduct);

  useEffect(() => {
    // Dispatch the thunk function when the component mounts
    dispatch(
      fetchDataProductById(DataFetchLinkList.dataProduct.getProductById + id)
    );
  }, [dispatch, id]);

  if (loading) {
    return <LoadingScreen />; // Render loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Render error message
  }

  const imageUrls = entityProductById.images.map((item) =>
    JSON.parse(item.replace(/\[|\]/g, ""))
  );

  const onHandleAddToMyCartButton = (product: ProductType) => {
    const addToCartSuccee = handleClickVariantPopUpWindow(
      "Added product to your cart",
      "success"
    );
    if (isLoggedIn) {
      dispatch(addItem(product));
      addToCartSuccee();
    } else {
      // Redirect to authentication page if user is not logged in
      navigate(websiteRouterList.authentication.shortLink);
    }
  };
  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4">{entityProductById.title}</Typography>
      </Box>
      <Box mt={2} mb={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {imageUrls.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`Product Image ${index}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1">
              {entityProductById.description}
            </Typography>
            <Box mt={4}>
              <Divider />
            </Box>
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Price: ${entityProductById.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => onHandleAddToMyCartButton(entityProductById)}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetailByIdScreen;
