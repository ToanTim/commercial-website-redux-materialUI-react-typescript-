import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { UserType } from "../misc/User";
import useReduxReducerRunner, {
  useAppSelector,
  useCheckAndLoadDataFromStorage,
} from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductType } from "../misc/Product";
import {
  DataBroswerName,
  DataFetchLinkList,
  websiteRouterList,
} from "../misc/BaseVariables";
import { useNavigate } from "react-router-dom";
import { fetchDataProduct } from "../hooks/features/slices/ProductSlice";
const UserProfileScreen = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(
    (state: RootState) => state.authentication.loggedIn
  );
  const userInfo = useAppSelector(
    (state: RootState) => state.authentication.entityCurrentUser
  );
  const entityProduct = useAppSelector(
    (state: RootState) => state.products.entityProduct
  );

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = (product: ProductType) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleApplyChanges = () => {
    // Implement logic to apply changes
    handleClose();
  };

  useReduxReducerRunner(fetchDataProduct, [
    DataFetchLinkList.dataProduct.getAll,
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(websiteRouterList.authentication.shortLink);
    }
  }, [isLoggedIn]);

  return (
    <Container maxWidth="md">
      <Paper
        style={{ maxWidth: 500, minWidth: 300, margin: "auto", padding: 4 }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} container>
            <Typography variant="h4">Account Info</Typography>
          </Grid>
          <Grid item xs={12} container alignItems="center">
            <Grid
              item
              container
              direction="column"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item>
                <Avatar
                  alt="User Avatar"
                  src={userInfo.avatar}
                  style={{ width: 100, height: 100, margin: "auto" }}
                />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h5">
                  {userInfo.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" gutterBottom color="textSecondary">
                  User ID: {userInfo.id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Role: {userInfo.role}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Email: {userInfo.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {userInfo.role == "admin" && (
        <>
          <div
            style={{
              maxHeight: 400,
              overflowY: "auto",
              marginTop: 100,
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Picture</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Product Price</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entityProduct.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Avatar alt={product.title} src={product.images[0]} />
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.price}$</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="settings"
                          onClick={() => handleEdit(product)}
                        >
                          <SettingsIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: 20,
                minWidth: 250,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Edit Product
              </Typography>
              <Avatar
                alt={selectedProduct?.title}
                src={selectedProduct?.images[0]}
                style={{ width: 100, height: 100, margin: "auto" }}
              />
              <TextField
                label="Product Image"
                defaultValue={selectedProduct?.images[0]}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Title"
                defaultValue={selectedProduct?.title}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                defaultValue={selectedProduct?.price.toString()}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                defaultValue={selectedProduct?.description}
                fullWidth
                margin="normal"
              />
              {/* Add other fields here */}
              <Button variant="contained" onClick={handleApplyChanges}>
                Apply Changes
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                style={{ marginLeft: 10 }}
              >
                Cancel
              </Button>
            </div>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default UserProfileScreen;
