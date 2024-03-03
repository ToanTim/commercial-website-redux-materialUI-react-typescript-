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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
