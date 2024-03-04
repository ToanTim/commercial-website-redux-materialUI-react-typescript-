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
  useAppDispatch,
  useAppSelector,
} from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import "../style/ProductScreen.scss";
import { websiteRouterList } from "../misc/BaseVariables";
import { filterProductsByCategories } from "../hooks/features/slices/ProductSlice";

const ProductScreen = () => {
  //TODO: challenge
  //wwhen we display category: what should we do when that categories does have any product yet?
  // Implement Pagination so it can be reuseable

  const navigate = useNavigate();
  // Dummy categories array (replace with your actual categories array)
  const categoryState = useAppSelector((state: RootState) => state.categories);
  const filteredProducts = useAppSelector(
    (state: RootState) => state.products.entityByCategory
  );

  const { entityCategory } = categoryState;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const dispatch = useAppDispatch();
  //-1 cause pagination starts with 1 but array start with 0
  let page = parseInt(queryParams.get("page") ?? "", 0) - 1;
  let startIndex = 10 * page;
  let endIndex = startIndex + 10;

  console.log("filteredProducts", filteredProducts);

  const totalPages = Math.ceil(Object.keys(filteredProducts).length / 10);

  console.log("totalPages", totalPages);

  //reducer to filter product by categories
  useReduxReducerRunner(
    filterProductsByCategories,
    [entityCategory],
    entityCategory
  );
  /* useEffect(() => {
    dispatch(filterProductsByCategories(entityCategory));
  }, [dispatch, entityCategory]); */

  //if page more than total pages
  if (page > totalPages) {
    page = totalPages;
    startIndex = totalPages * 10;
    endIndex = Object.keys(filteredProducts).length;
  }

  //if endIndex is more than array length
  if (endIndex > Object.keys(filteredProducts).length) {
    endIndex = Object.keys(filteredProducts).length;
  }

  const dataDisplay = useMemo(() => {
    return entityCategory.slice(startIndex, endIndex);
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
    value: number //this is numebr of page clicked on pagition bar
  ) => {
    navigate(websiteRouterList.product.shortLink + value);
    scrollToTop();
  };

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

  /* console.log("entityCategory", entityCategory); */
  /* console.log("filteredProducts", filteredProducts); */
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
                  <Typography variant="h5" gutterBottom marginTop={10}>
                    {category.name}
                  </Typography>
                  {/* Render products for each category */}
                  <Box sx={{ display: "flex", overflowX: "auto", gap: 10 }}>
                    {/* Dummy products (replace with your actual products data) */}
                    {filteredProducts[category.id].map((item) => (
                      <Grid item xs={12} sm={6} md={4}>
                        <Card className="card">
                          <CardMedia
                            component="img"
                            height="140"
                            image="https://source.unsplash.com/random"
                            alt="Product Image"
                          />
                          <CardContent className="cardContent">
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                              Price: {item.price} USD
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                            >
                              Detail
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                            >
                              Add to cart
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
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
