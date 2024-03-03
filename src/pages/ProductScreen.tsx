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
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import "../style/ProductScreen.scss";

const ProductScreen = () => {
  // Dummy categories array (replace with your actual categories array)
  const categoryState = useAppSelector((state: RootState) => state.categories);
  const { entityCategory } = categoryState;

  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="md">
          {entityCategory.map((category) => (
            <div key={category.id}>
              <Typography variant="h5" gutterBottom>
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
        </Container>
      </main>
    </>
  );
};

export default ProductScreen;
