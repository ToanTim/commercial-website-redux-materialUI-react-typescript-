import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Link,
  Button,
  Pagination,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//internal
import useReduxReducerRunner, {
  handleClickVariantPopUpWindow,
  useAppDispatch,
  useAppSelector,
} from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import "../style/ProductScreen.scss";
import { websiteRouterList } from "../misc/BaseVariables";
import { filterProductsByCategories } from "../hooks/features/slices/ProductSlice";
import defaultProductPicture from "../components/pictures/default_product_image.jpg";
import { CategorySingleType, ProductType } from "../misc/Product";
import { handleTransformUrlImage } from "../hooks/functions";
import { addItem } from "../hooks/features/slices/CartSlice";
const ProductScreen = () => {
  //TODO: challenge
  //wwhen we display category: what should we do when that categories does have any product yet?
  // Implement Pagination so it can be reuseable
  // Add loadingScreen logic
  // add features to cart, when product got delete from admin, it also delete from user cart

  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.authentication.loggedIn
  );
  const categoryState = useAppSelector((state: RootState) => state.categories);
  const filteredProducts = useAppSelector(
    (state: RootState) => state.products.entityByCategory
  );
  const { entityCategory } = categoryState;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const dispatch = useAppDispatch();

  //pages variables
  let page = parseInt(queryParams.get("page") ?? "", 0) - 1; //-1 cause pagination starts with 1 but array start with 0
  let startIndex = 10 * page;
  let endIndex = startIndex + 10;
  const totalPages = Math.ceil(Object.keys(filteredProducts).length / 10);

  //reducer to filter product by categories
  useReduxReducerRunner(
    filterProductsByCategories,
    [entityCategory],
    entityCategory
  );

  const listOfCategoryThatHasProduct = useMemo(() => {
    return Object.keys(filteredProducts).reduce(
      (result: CategorySingleType[], key) => {
        if (filteredProducts.hasOwnProperty(key)) {
          let category = entityCategory.find((cat) => cat.id === Number(key));
          if (category) {
            result.push(category);
          }
        }
        return result;
      },
      []
    );
  }, [filteredProducts, entityCategory]);

  if (page > totalPages) {
    //if page more than total pages
    page = totalPages;
    startIndex = totalPages * 10;
    endIndex = Object.keys(filteredProducts).length;
  }

  if (endIndex > Object.keys(filteredProducts).length) {
    endIndex = Object.keys(filteredProducts).length;
  }

  const dataDisplay = useMemo(() => {
    return listOfCategoryThatHasProduct.slice(startIndex, endIndex);
  }, [entityCategory, startIndex, endIndex]);

  const scrollToTop = () => {
    // fucntion to scroll to the top after click pagination page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional smooth scrolling behavior
    });
  };

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number //this is numeber of page clicked on pagition bar
  ) => {
    navigate(websiteRouterList.product.shortLink + value);
    scrollToTop();
  };
  /* console.log("start", startIndex);
console.log("end", endIndex)
  console.log("filteredProducts", filteredProducts);
  console.log(
    "Object.keys(filteredProducts).length ",
    Object.keys(filteredProducts).length
  );
  console.log("entityCategory", entityCategory);
  console.log("dataDisplay", dataDisplay); */
  const paginationBox = (
    <Box
      sx={{
        display: totalPages <= 1 ? "none" : "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handleChangePagination}
      />
    </Box>
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
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="md">
          {paginationBox}
          {dataDisplay.map((category) => {
            if (
              //id does not sync between products and categories so it may cost undefined some where
              filteredProducts[category.id] != undefined &&
              filteredProducts[category.id].length > 0
            ) {
              return (
                <div key={category.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                      marginTop: "50px",
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {category.name}
                    </Typography>
                    {/* "See More" button */}

                    {filteredProducts[category.id].length > 10 ? (
                      <Button variant="contained" color="primary" size="small">
                        See More
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", overflowX: "auto", gap: 10 }}>
                    {filteredProducts[category.id].slice(0, 10).map((item) => {
                      const imageUrls = handleTransformUrlImage(item.images);
                      return (
                        <Grid item xs={12} sm={6} md={4}>
                          <Card
                            className="card"
                            sx={{ maxWidth: 345, minWidth: 250 }}
                          >
                            <CardMedia
                              component="img"
                              height="140"
                              image={imageUrls[0]}
                              alt="Product Image"
                            />
                            <CardContent className="cardContent">
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item.description.length > 50
                                  ? `${item.description.substring(0, 50)}...`
                                  : item.description}
                              </Typography>
                              <Typography
                                variant="h6"
                                color="text.secondary"
                                align="justify"
                                style={{ textAlign: "center" }}
                              >
                                Price: {item.price} $
                              </Typography>
                            </CardContent>

                            <CardActions>
                              <Button
                                size="small"
                                onClick={() => {
                                  navigate(
                                    websiteRouterList.productDetailById
                                      .shortLink + item.id
                                  );
                                }}
                              >
                                More detail
                              </Button>
                              <Button
                                size="small"
                                onClick={() => onHandleAddToMyCartButton(item)}
                              >
                                Add to my cart
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Box>
                </div>
              );
            } else {
              return null;
            }
          })}
          {paginationBox}
        </Container>
      </main>
    </>
  );
};

export default ProductScreen;
function navigate(shortLink: string) {
  throw new Error("Function not implemented.");
}
