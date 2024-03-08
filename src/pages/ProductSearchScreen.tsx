import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Pagination,
  TextField,
  Slider,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Autocomplete,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { DataFetchLinkList, websiteRouterList } from "../misc/BaseVariables";
import {
  fetchDataProduct,
  fetchDataProductByFilter,
  filterProductsByDefault,
  filterProductsByPriceHighToLow,
  filterProductsByPriceLowToHigh,
  startLoading,
  stopLoading,
} from "../hooks/features/slices/ProductSlice";
import useReduxReducerRunner, {
  handleClickVariantPopUpWindow,
  useAppDispatch,
  useAppSelector,
  useScreenWidth,
} from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import { ProductType } from "../misc/Product";
import {
  debounceFunction,
  getCategoryIDFromName,
  getNameFromCategoryID,
  handleFormErrors,
  handleTransformUrlImage,
  scrollToTop,
} from "../hooks/functions";
import { addItem } from "../hooks/features/slices/CartSlice";
import ButtonBaseComponent from "../components/Button/ButtonBaseComponent";
import LoadingScreen from "./LoadingScreen";
import { fetchDataCategory } from "../hooks/features/slices/CategorySlice";
import NoDataComponent from "../components/NoDataComponent";

interface FormData {
  productName: string;
  minimumPrice: number;
  maximumPrice: number;
  category: string | null;
}
// Define the initial data for the form
const initialFormData: FormData = {
  productName: "",
  minimumPrice: 0,
  maximumPrice: 9999,
  category: "",
};

const ProductSearchScreen = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const screenWidth = useScreenWidth();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const entityProductDefault = useAppSelector(
    (state: RootState) => state.products.entityProduct
  );

  const isLoggedIn = useAppSelector(
    (state: RootState) => state.authentication.loggedIn
  );
  const entityByPriceOrder = useAppSelector(
    (state: RootState) => state.products.entityByPriceOrder
  );
  const productLoading = useAppSelector(
    (state: RootState) => state.products.loadingProduct
  );

  const [isSearchPopup, setIsSearchPopup] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedData, setSortedData] = useState<ProductType[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const categoryEntityArray = useAppSelector(
    (state: RootState) => state.categories.entityCategory
  );

  // Get individual query parameters
  const dispatch = useAppDispatch();

  let categoryIdQuery = queryParams.get("categoryId");

  const navigate = useNavigate();
  const totalPages = Math.ceil(sortedData.length / 20);
  let startIndex = 20 * page;
  let endIndex = startIndex + 20;

  useEffect(() => {
    // Sort products when sortBy changes
    dispatch(startLoading());
    if (sortBy === "low") {
      dispatch(filterProductsByPriceLowToHigh());
    } else if (sortBy === "high") {
      dispatch(filterProductsByPriceHighToLow());
    } else if (categoryIdQuery == "-1" || categoryIdQuery == null) {
      dispatch(filterProductsByDefault());
    } else {
      //fetch by category take param from url, only one time
      const searchUrl =
        DataFetchLinkList.dataProduct.getAll + "?categoryId=" + categoryIdQuery;
      debouncedFetchDataProduct(searchUrl);
      setFormData({
        ...formData,
        category: getNameFromCategoryID(
          categoryIdQuery == null ? "-1" : categoryIdQuery,
          categoryEntityArray
        ),
      });
      categoryIdQuery = "-1";
    }

    dispatch(stopLoading());
  }, [dispatch, sortBy]);

  useReduxReducerRunner(fetchDataProduct, [
    DataFetchLinkList.dataProduct.getAll + "?categoryId=" + categoryIdQuery,
  ]);

  useReduxReducerRunner(fetchDataCategory, [
    DataFetchLinkList.dataCategory.getAll,
  ]);

  useEffect(() => {
    setSortedData(entityProductDefault);
  }, [entityProductDefault]);

  const debouncedFetchDataProduct = useCallback(
    debounceFunction(dispatch, fetchDataProduct, 100),
    [dispatch]
  );

  useEffect(() => {
    // Update sortedData after dispatch is complete
    setSortedData(entityByPriceOrder);
  }, [entityByPriceOrder]);
  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number //this is numeber of page clicked on pagition bar
  ) => {
    setPage(value - 1);
    scrollToTop();
  };
  const categoryNamesArray = useMemo(() => {
    const array = categoryEntityArray.map((category) => category.name);
    array.push("All");
    return array;
  }, [categoryEntityArray]);

  useReduxReducerRunner(fetchDataProduct, [
    DataFetchLinkList.dataProduct.getAll as any,
  ]);

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

  const dataDisplay = useMemo(() => {
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, startIndex, endIndex]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const PaginationBox = (
    <Box
      sx={{
        display: totalPages <= 1 ? "none" : "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
      paddingTop={10}
      paddingBottom={10}
    >
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handleChangePagination}
      />
    </Box>
  );

  const handleSortButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  if (productLoading) {
    return <LoadingScreen />;
  }
  const handleSearchPopupOpen = () => {
    setIsSearchPopup(true);
  };

  const handleSearchPopupClose = () => {
    setIsSearchPopup(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorInputList = handleFormErrors(formData, [
      "invalidProductName",
      "InvalidCategoryName",
      "minimumPriceValueError",
      "maximumPriceValueError",
      "minimumMoreThanMaximum",
    ]);

    errorInputList.map((item) => {
      const popUpNotificationWindowProductSearch =
        handleClickVariantPopUpWindow(item, "error");
      popUpNotificationWindowProductSearch();
    });

    console.log(formData);
    if (errorInputList.length <= 0) {
      setIsLoading(true);
      let categoryId = "";
      if (formData.category && formData.category.length > 0) {
        categoryId = getCategoryIDFromName(
          formData.category,
          categoryEntityArray
        );
      }
      if (categoryId === null) {
        categoryId = " ";
      }

      const searchUrl =
        DataFetchLinkList.dataProduct.getAll +
        "?title=" +
        formData.productName +
        "&price_min=" +
        formData.minimumPrice +
        "&price_max=" +
        formData.maximumPrice +
        "&categoryId=" +
        categoryId;

      console.log(searchUrl);

      debouncedFetchDataProduct(searchUrl);
      setIsSearchPopup(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const popSearchPopUpWindowComponent = (
    <Dialog
      open={isSearchPopup}
      onClose={handleSearchPopupClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Search Filters</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="productName"
          name="productName"
          label="Product Name"
          value={formData.productName}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          autoFocus
          margin="dense"
          id="minimumPrice"
          name="minimumPrice"
          label="Minimum Price ($)"
          type="number"
          value={formData.minimumPrice}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="maximumPrice"
          name="maximumPrice"
          label="Maximum Price ($)"
          type="number"
          value={formData.maximumPrice}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />
        <Autocomplete
          value={formData.category}
          options={categoryNamesArray}
          onChange={(event, newValue, reason) => {
            if (
              event.type === "keydown" &&
              ((event as React.KeyboardEvent).key === "Backspace" ||
                (event as React.KeyboardEvent).key === "Delete") &&
              reason === "removeOption"
            ) {
              return;
            }
            setFormData((formData) => ({
              ...formData,
              category: newValue,
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              id="category"
              name="category"
              label="Category"
              fullWidth
              variant="outlined"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSearchPopupClose}>Cancel</Button>
        <Button type="submit">Apply</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container
      maxWidth="md"
      style={{ minHeight: "100vh", paddingBottom: totalPages < 2 ? 50 : 0 }}
    >
      <ButtonBaseComponent />
      <Grid container spacing={2} paddingTop={10}>
        <Grid item xs={12} sm={6} md={6}>
          <Button variant="contained" fullWidth onClick={handleSearchPopupOpen}>
            Filter
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Button variant="contained" fullWidth onClick={handleSortButtonClick}>
            Sort
          </Button>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <List>
              <ListItemButton
                onClick={() => {
                  setSortBy("low");
                  handleClosePopover();
                }}
              >
                <ListItemText>Lowest to Highest</ListItemText>
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  setSortBy("high");
                  handleClosePopover();
                }}
              >
                <ListItemText>Highest to Lowest</ListItemText>
              </ListItemButton>
            </List>
            {sortBy != "" && (
              <ListItemButton
                onClick={() => {
                  setSortBy("");
                  handleClosePopover();
                }}
              >
                <ListItemText>Clear sort</ListItemText>
              </ListItemButton>
            )}
          </Popover>
        </Grid>
      </Grid>
      {popSearchPopUpWindowComponent}
      {PaginationBox}
      <Grid container spacing={2} paddingTop={10}>
        {dataDisplay.length <= 0 ? (
          <NoDataComponent />
        ) : (
          dataDisplay.map((item: ProductType) => {
            const imageUrls = handleTransformUrlImage(item.images);
            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  className="card"
                  sx={{
                    maxWidth: screenWidth < 600 ? 9999 : 250,
                    minWidth: 250,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={imageUrls[0].replace(/^"(.*)"$/, "$1")}
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
                          websiteRouterList.productDetailById.shortLink +
                            item.id
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
          })
        )}
      </Grid>
      {PaginationBox}
    </Container>
  );
};

export default ProductSearchScreen;
