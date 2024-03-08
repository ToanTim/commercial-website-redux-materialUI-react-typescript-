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
  handleClickVariantPopUpWindow,
  useAppDispatch,
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
import {
  createNewProduct,
  deleteProduct,
  editProduct,
  fetchDataProduct,
} from "../hooks/features/slices/ProductSlice";

interface FormData {
  productId: number;
  productImage: string;
  title: string;
  price: string;
  description: string;
}

const initialFormData: FormData = {
  productId: -1,
  productImage: "",
  title: "",
  price: "",
  description: "",
};

const UserProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
  const [formData, setFormData] = useState<FormData>(
    selectedProduct
      ? {
          productId: selectedProduct.id,
          productImage: selectedProduct.images[0],
          title: selectedProduct.title,
          price: selectedProduct.price.toString(),
          description: selectedProduct.description,
        }
      : initialFormData
  );
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
  const [newProductData, setNewProductData] = useState({
    title: "",
    price: 0,
    description: "",
    categoryId: 1, // Default category ID
    images: ["https://placeimg.com/640/480/any"],
  });

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = (product: ProductType) => {
    setFormData({
      productId: product.id,
      productImage: product.images[0],
      title: product.title,
      price: product.price.toString(),
      description: product.description,
    });
    setOpen(true);
  };

  useReduxReducerRunner(fetchDataProduct, [
    DataFetchLinkList.dataProduct.getAll,
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(websiteRouterList.authentication.shortLink);
    }
  }, [isLoggedIn]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productId = formData.productId;
    const newData = {
      title: formData.title,
      price: parseInt(formData.price),
      describe: formData.description,
    };
    dispatch(editProduct({ productId, newData }));
    const editSuccessConfirm = handleClickVariantPopUpWindow(
      "Edit product successful",
      "success"
    );
    editSuccessConfirm();
    handleClose();
  };

  const handleDeleteProduct = (product: ProductType) => {
    setFormData({
      productId: product.id,
      productImage: product.images[0],
      title: product.title,
      price: product.price.toString(),
      description: product.description,
    });
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    const productId = formData.productId; // Example productId

    dispatch(deleteProduct({ productId }));
    const deleteSuccessConfirm = handleClickVariantPopUpWindow(
      "Delete product successful",
      "success"
    );
    deleteSuccessConfirm();
    setShowDeleteConfirmation(false);
  };

  const handleCloseConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  //create new product popUpWindow

  const handleCreateProduct = () => {
    setShowCreateProductForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateProductForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmitCreation = () => {
    const newData = {
      title: newProductData.title,
      price: newProductData.price,
      description: newProductData.description,
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    };

    // Reset form data

    dispatch(createNewProduct(newData));
    setNewProductData({
      title: "",
      price: 0,
      description: "",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    });
    setShowCreateProductForm(false);
    const createSuccessConfirm = handleClickVariantPopUpWindow(
      "Create product successful",
      "success"
    );
    createSuccessConfirm();
  };
  return (
    <Container maxWidth="md" style={{ minHeight: "100vh" }}>
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
          <Button
            variant="contained"
            onClick={handleCreateProduct}
            style={{ marginTop: 100 }}
          >
            Create Product
          </Button>
          <div
            style={{
              maxHeight: 400,
              overflowY: "auto",
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
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteProduct(product)}
                        >
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
            <form onSubmit={handleSubmit}>
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
                  src={formData.productImage}
                  style={{ width: 100, height: 100, margin: "auto" }}
                />
                <TextField
                  name="productImage"
                  label="Product Image"
                  value={formData.productImage}
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  name="title"
                  label="Title"
                  value={formData.title}
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  name="price"
                  label="Price"
                  value={formData.price}
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  name="description"
                  label="Description"
                  value={formData.description}
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                {/* Add other fields here */}
                <Button type="submit" variant="contained">
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
            </form>
          </Modal>
          <Modal
            open={showDeleteConfirmation}
            onClose={handleCloseConfirmation}
          >
            <div
              style={{
                minWidth: 300,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: 20,
                minHeight: 200,
              }}
            >
              <h2>Are you sure you want to delete this product?</h2>
              <Button
                variant="contained"
                color="error"
                style={{ position: "absolute", bottom: 10, left: 10 }}
                onClick={handleConfirmDelete}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="success"
                style={{ position: "absolute", bottom: 10, right: 10 }}
                onClick={handleCloseConfirmation}
              >
                No
              </Button>
            </div>
          </Modal>
          <Modal open={showCreateProductForm} onClose={handleCloseForm}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: 20,
              }}
            >
              <h2>New Product</h2>
              <TextField
                name="title"
                label="Product Title"
                value={newProductData.title}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="price"
                label="Product Price"
                type="number"
                value={newProductData.price}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="description"
                label="Product Description"
                value={newProductData.description}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />

              <TextField
                name="description"
                label="Product Image"
                value={newProductData.images}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmitCreation}
              >
                Apply
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseForm}
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
