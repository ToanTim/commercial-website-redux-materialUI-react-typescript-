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
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import "../style/ProductScreen.scss";
import { websiteRouterList } from "../misc/BaseVariables";

const ProductScreen = () => {
  //TODO: challenge
  //wwhen we display category: what should we do when that categories does have any product yet?
  // Implement Pagination so it can be reuseable

  const navigate = useNavigate();
  // Dummy categories array (replace with your actual categories array)
  const categoryState = useAppSelector((state: RootState) => state.categories);
  const { entityCategory } = categoryState;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  //-1 cause it start with 1 but array start with 0
  let page = parseInt(queryParams.get("page") ?? "", 0) - 1;
  let startIndex = 10 * page;
  let endIndex = startIndex + 10;
  //memorized data from pages

  const totalPages = Math.ceil(entityCategory.length / 10);

  //if page more than total pages
  if (page > totalPages) {
    page = totalPages;
    startIndex = totalPages * 10;
    endIndex = entityCategory.length;
  }

  //if endIndex is more than array length
  if (endIndex > entityCategory.length) {
    endIndex = entityCategory.length;
  }

  const dataDisplay = useMemo(() => {
    return entityCategory.slice(startIndex, endIndex);
  }, [entityCategory, startIndex, endIndex]);

  const scrollToTop = () => {
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
  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="md">
          {paginationBox}
          {dataDisplay.map((category) => (
            <div key={category.id}>
              <Typography variant="h5" gutterBottom marginTop={10}>
                {category.name}
              </Typography>
              {/* Render products for each category */}
              <Box sx={{ display: "flex", overflowX: "auto", gap: 10 }}>
                {/* Dummy products (replace with your actual products data) */}
                {Array.from({ length: 20 }).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card className="card">
                      <CardMedia
                        image="https://source.unsplash.com/random"
                        title="Image title"
                        className="cardMedia"
                      />
                      <CardContent className="cardContent">
                        <Typography gutterBottom variant="h5">
                          test injbhibugcry
                        </Typography>

                        <CardActions style={{ bottom: 0 }}>
                          <Button
                            size="small"
                            color="primary"
                            variant="contained"
                          >
                            Detail
                          </Button>
                          <Button
                            size="small"
                            color="primary"
                            variant="contained"
                          >
                            Add to cart
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Box>
            </div>
          ))}
          {paginationBox}
        </Container>
      </main>
    </>
  );
};

export default ProductScreen;
