import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface ErrorPageProps {
  errorMessage?: string;
}

const ErrorScreen: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h1" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="h5" gutterBottom>
        {errorMessage ? errorMessage : "An unexpected error occurred."}
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ mr: 2 }}
      >
        Go to Homepage
      </Button>
      <Button
        onClick={() => window.location.reload()}
        variant="contained"
        color="primary"
      >
        Retry
      </Button>
    </Container>
  );
};

export default ErrorScreen;
