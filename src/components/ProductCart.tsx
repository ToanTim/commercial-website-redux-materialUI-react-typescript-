import React from "react";
import { handleTransformUrlImage } from "../hooks/functions";
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
import { useLocation, useNavigate } from "react-router-dom";
import { websiteRouterList } from "../misc/BaseVariables";
import { ProductType } from "../misc/Product";

const ProductCart = (filteredProducts: ProductType[]) => {
  const navigate = useNavigate();
  return (
    <>
      {filteredProducts.map((item: any) => {
        const imageUrls = handleTransformUrlImage(item.images);
        function onHandleAddToMyCartButton(item: any): void {
          throw new Error("Function not implemented.");
        }

        return (
          <Grid item xs={12} sm={6} md={4}>
            <Card className="card" sx={{ maxWidth: 345, minWidth: 250 }}>
              <CardMedia
                component="img"
                height="140"
                image={imageUrls[0]}
                alt="Product Image"
              />

              <CardContent className="cardContent">
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
                      websiteRouterList.productDetailById.shortLink + item.id
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
    </>
  );
};

export default ProductCart;
