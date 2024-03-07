import React from "react";
import { IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ButtonBaseComponent = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous route
  };

  return (
    <IconButton onClick={goBack}>
      <ArrowBack /> <Typography variant="h5">Back</Typography>
    </IconButton>
  );
};

export default ButtonBaseComponent;
