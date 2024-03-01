import { Container, CssBaseline, Typography } from "@mui/material";
import React from "react";

const ProductScreen = () => {
  return (
    <>
      <CssBaseline />
      <main>
        <div>
          <Container maxWidth="sm"></Container>
          <Typography variant="h2" color="textPrimary" gutterBottom>
            Product
          </Typography>
        </div>
      </main>
    </>
  );
};

export default ProductScreen;
