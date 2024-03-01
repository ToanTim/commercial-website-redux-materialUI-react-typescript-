import { Container, CssBaseline, Typography } from "@mui/material";
import React from "react";

const ProductScreen = () => {
  return (
    <>
      <CssBaseline />
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Product
            </Typography>
          </Container>
        </div>
      </main>
    </>
  );
};

export default ProductScreen;
