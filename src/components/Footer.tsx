import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { GitHub, LinkedIn, Twitter, Facebook } from "@mui/icons-material";

const Footer: React.FC = () => {
  const items = [
    "About Pablo Designs",
    "Track my Order",
    "Careers",
    "Return Policy",
    "Help Center",
    "Report a Bug",
    "Press",
    "FAQ",
    "Prospero UI Kit",
  ];
  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ minHeight: 250 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="inherit">
              TOP QUALITY
              <br />
              We use the best materials in the industry to create timeless
              pieces that last.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="flex-end">
            <IconButton
              component={Link}
              href="https://github.com"
              color="inherit"
            >
              <GitHub />
            </IconButton>
            <IconButton
              component={Link}
              href="https://linkedin.com"
              color="inherit"
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component={Link}
              href="https://twitter.com"
              color="inherit"
            >
              <Twitter />
            </IconButton>
            <IconButton
              component={Link}
              href="https://facebook.com"
              color="inherit"
            >
              <Facebook />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
      <Grid container justifyContent="center">
        <Typography variant="body2" color="inherit">
          PRIVATE AND COOKIE POLICY | 2024 | Toan Tran
        </Typography>
      </Grid>
    </AppBar>
  );
};

export default Footer;
