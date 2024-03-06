//external
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

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
} from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import {
  fetchCurrentUserDataByToken,
  logout,
} from "../hooks/features/slices/UserSlice";
import LoadingScreen from "../pages/LoadingScreen";
const Header = () => {
  //variable
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    // Define the URL and bodyData required for the API call
    const url = DataFetchLinkList.authentication.userProfile;

    // Dispatch the async thunk with the URL and bodyData
    dispatch(fetchCurrentUserDataByToken({ url, accessToken }));
  }, [accessToken]); // Run this effect only once when the component mounts

  useEffect(() => {
    // Save data to local storage whenever it changes
    saveDataToStorage(
      DataBroswerName.authenticationCurrentUser.keyName,
      currentUserData
    );
  }, [currentUserData]);

  if (userLoading) {
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
      text: "Products",
      onButtonClick: () => {
        navigate(websiteRouterList.product.shortLink + "1");
      },
    },
    {
      link: "#",
      text: "Contact",
      onButtonClick: () => {},
    },
  ];

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

        <Container maxWidth="sm">
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
        {/* Render menu if user is logged in */}
        {isLoggedIn && currentUserData ? (
          <div>
            <Button
              size="small"
              color="inherit"
              aria-label="profile"
              onClick={handleMenuOpen}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <IconButton size="small" color="inherit" aria-label="profile">
                <AccountCircleIcon />
              </IconButton>
              {currentUserData.name}
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate(
                    websiteRouterList.user.shortLink + currentUserData.id
                  );
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

                  //turn DataBroswerName in to array of name
                  const keyNameArrayToClear = Object.values(
                    DataBroswerName
                  ).map((item) => item.keyName);

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
        ) : (
          // Render login link if user is not logged in
          <IconButton
            size="small"
            edge="end"
            color="inherit"
            aria-label="profile"
            sx={{ ml: "auto" }}
            onClick={() => {
              navigate(websiteRouterList.authentication.shortLink);
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
