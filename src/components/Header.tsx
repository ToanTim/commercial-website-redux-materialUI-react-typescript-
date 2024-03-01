//external
import React from "react";
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
} from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

//internal
import { websiteRouterList } from "../misc/BaseVariables";
const Header = () => {
  //variable
  const navigate = useNavigate();

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
        navigate(websiteRouterList.product.shortLink);
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
          sx={{ mr: 2 }}
        >
          <HiveIcon />
          {/* Button at the middle */}
          <Button color="inherit">BeeHouse</Button>
        </IconButton>

        <Container maxWidth="sm">
          {navButton.map((item) => (
            <Button onClick={item.onButtonClick} variant="text" key="item.text">
              <Typography variant="h6" color="white">
                {item.text}
              </Typography>
            </Button>
          ))}
          <IconButton
            size="large"
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
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
