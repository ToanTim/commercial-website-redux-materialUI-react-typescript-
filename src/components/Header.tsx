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
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <PhotoCamera />
        <Typography variant="h6">Photo Album</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
