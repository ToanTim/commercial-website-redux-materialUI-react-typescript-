//external
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
  Container,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
//internal
import {
  DataBroswerName,
  DataFetchLinkList,
  websiteRouterList,
} from "../misc/BaseVariables";
import {
  clearUserStateFromStorage,
  saveDataToStorage,
  useAppDispatch,
  useAppSelector,
  useScreenWidth,
} from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import {
  fetchCurrentUserDataByToken,
  logout,
} from "../hooks/features/slices/UserSlice";
import LoadingScreen from "../pages/LoadingScreen";

const Header = () => {
  //variable
  const [isLoading, setIsLoading] = useState(false);
  const screenWidth = useScreenWidth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state: RootState) => state.cart);

  const isLoggedIn = useAppSelector(
    (state: RootState) => state.authentication.loggedIn
  );

  const accessToken = useAppSelector(
    (state: RootState) => state.authentication.accessToken
  );
  const userLoading = useAppSelector(
    (state: RootState) => state.authentication.loadingUser
  );
  const currentUserData = useAppSelector(
    (state: RootState) => state.authentication.entityCurrentUser
  );

  // State for managing menu anchor element
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const url = DataFetchLinkList.authentication.userProfile;

    if (accessToken.length > 0) {
      dispatch(fetchCurrentUserDataByToken({ url, accessToken }));
    }
  }, [accessToken]);

  useEffect(() => {
    // Save data to local storage whenever it changes
    saveDataToStorage(
      DataBroswerName.authenticationCurrentUser.keyName,
      currentUserData
    );
  }, [currentUserData]);

  useEffect(() => {
    // Save data to local storage whenever it changes
    saveDataToStorage(DataBroswerName.cartData.keyName, cart);
  }, [cart]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  interface navButtonType {
    link: string;
    text: string;
    onButtonClick: () => void;
  }
  const navButton: navButtonType[] = [
    {
      link: "#",
      text: "Home",
      onButtonClick: () => {
        navigate(websiteRouterList.home.shortLink);
      },
    },
    {
      link: "#",
      text: "Products",
      onButtonClick: () => {
        setIsLoading(true);
        navigate(websiteRouterList.product.shortLink + "1");
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      },
    },
  ];

  const redirectSearchScreen = () => {
    navigate(websiteRouterList.productSearch.shortLink);
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        {/* Icon on the left end */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => {
            navigate(websiteRouterList.home.shortLink);
          }}
        >
          <HiveIcon />
          {/* Button at the middle */}
          <Button color="inherit" style={{ fontSize: "clamp(1px, 2vw, 20px)" }}>
            BeeHouse
          </Button>
        </IconButton>

        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {navButton.map((item) => (
            <Button onClick={item.onButtonClick} variant="text" key={item.text}>
              <Typography
                style={{ fontSize: "clamp(1px, 2vw, 20px)" }}
                color="white"
              >
                {item.text}
              </Typography>
            </Button>
          ))}
        </Container>

        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              edge="end"
              color="inherit"
              aria-label="profile"
              sx={{ ml: "auto" }}
              onClick={redirectSearchScreen}
            >
              <SearchIcon />
            </IconButton>
            {isLoggedIn && (
              <IconButton
                size="small"
                color="inherit"
                aria-label="profile"
                onClick={() => navigate(websiteRouterList.cart.shortLink)}
              >
                <Badge badgeContent={cart.totalItems} color="error">
                  <ShoppingBasketIcon />
                </Badge>
              </IconButton>
            )}

            <Button
              size="small"
              color="inherit"
              aria-label="profile"
              onClick={
                isLoggedIn
                  ? handleMenuOpen
                  : () => {
                      navigate(websiteRouterList.authentication.shortLink);
                    }
              }
              sx={{
                margin: 0,
                padding: 0,
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                minWidth: 34,
              }}
            >
              <IconButton size="small" color="inherit" aria-label="profile">
                <AccountCircleIcon />
              </IconButton>
              {screenWidth > 500 && currentUserData && isLoggedIn
                ? currentUserData.name
                : ""}
            </Button>
            {/*  {isLoggedIn && currentUserData ? ( */}
          </div>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                navigate(websiteRouterList.user.shortLink + currentUserData.id);
                handleMenuClose();
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                // Dispatch logout action here
                handleMenuClose();
                dispatch(logout());

                navigate(websiteRouterList.authentication.shortLink);
                //turn DataBroswerName in to array of name
                const keyNameArrayToClear = Object.values(DataBroswerName).map(
                  (item) => item.keyName
                );

                //Clear data from storage brower
                keyNameArrayToClear.map((item) => {
                  clearUserStateFromStorage(item);
                });
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
function setIsPopupOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
