import React, { useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Container,
  Grid,
  Box, // Import Box component for spacing
} from "@mui/material";
import { RemoveShoppingCart } from "@mui/icons-material";
import { removeItem, updateQuantity } from "../hooks/features/slices/CartSlice";
import { RootState } from "../hooks/features/store/store";
import { CartType } from "../misc/Cart";
import {
  handleClickVariantPopUpWindow,
  useAppDispatch,
  useAppSelector,
} from "../hooks/hooks";
import { handleTransformUrlImage } from "../hooks/functions";
import { useNavigate } from "react-router-dom";
import { websiteRouterList } from "../misc/BaseVariables";

const ShoppingCartScreen: React.FC = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.authentication.loggedIn
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(websiteRouterList.authentication.shortLink);
    }
  }, [isLoggedIn]);

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
    const removeItemSuccess = handleClickVariantPopUpWindow(
      "Remove quantity of item successful",
      "success"
    );
    removeItemSuccess();
  };

  const handleEditQuantity = (
    currentItemQuantity: number,
    itemId: number,
    quantityAdded: number
  ) => {
    let quantity = currentItemQuantity + quantityAdded;
    if (quantity < 1) {
      quantity = 1;
      const decreaseItemQuantityError = handleClickVariantPopUpWindow(
        "Quantity of item is already at minimum",
        "error"
      );
      decreaseItemQuantityError();

      return 0;
    }
    dispatch(updateQuantity({ itemId, quantity }));

    if (quantityAdded == 1) {
      const increaseItemSuccess = handleClickVariantPopUpWindow(
        "Increase quantity of item successful",
        "success"
      );
      increaseItemSuccess();
    } else {
      const decreaseItemSuccess = handleClickVariantPopUpWindow(
        "Decrease quantity of item successful",
        "success"
      );
      decreaseItemSuccess();
    }
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log("Checkout clicked");
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4">Shopping Cart</Typography>
          {cart.items.length === 0 ? (
            <Typography variant="subtitle1">Your cart is empty.</Typography>
          ) : (
            <List>
              {cart.items.map((item) => {
                const productImageArray = handleTransformUrlImage(item.images);
                return (
                  <ListItem key={item.id} style={{ marginTop: 50 }}>
                    <img
                      src={productImageArray[0]}
                      alt={`Product Image ${item.id}`}
                      style={{ marginRight: 20, width: 100, height: "auto" }}
                    />{" "}
                    {/* Add image element */}
                    <ListItemText
                      primary={item.title}
                      secondary={`Price: $${item.price}`}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        onClick={() => handleRemoveItem(item.id)}
                        startIcon={<RemoveShoppingCart />}
                      >
                        Remove
                      </Button>
                      <IconButton
                        onClick={() =>
                          handleEditQuantity(
                            cart.quantityPerItem.find(
                              (qi) => qi.itemId === item.id
                            )?.quantity as number,
                            item.id,
                            -1
                          )
                        }
                        aria-label="Decrease Quantity"
                      >
                        -
                      </IconButton>
                      <Typography variant="body1">
                        {
                          cart.quantityPerItem.find(
                            (qi) => qi.itemId === item.id
                          )?.quantity
                        }
                      </Typography>
                      <IconButton
                        onClick={() =>
                          handleEditQuantity(
                            cart.quantityPerItem.find(
                              (qi) => qi.itemId === item.id
                            )?.quantity as number,
                            item.id,
                            1
                          )
                        }
                        aria-label="Increase Quantity"
                      >
                        +
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          )}
          <Box mt={2}>
            {" "}
            {/* Add margin top for spacing */}
            <Typography variant="subtitle1">
              Total Items: {cart.totalItems}
            </Typography>
            <Typography variant="subtitle1">
              Total Price: ${cart.totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShoppingCartScreen;
