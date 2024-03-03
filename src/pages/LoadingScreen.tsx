import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/system";

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.8);
  }
`;

const LoadingScreen: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress
        size={80}
        color="primary"
        sx={{
          animation: `${rotateAnimation} 2s linear infinite, ${pulseAnimation} 1s ease-in-out infinite`,
        }}
      />
      <Typography
        variant="h6"
        color="textSecondary"
        mt={2}
        sx={{ animation: `${pulseAnimation} 1s ease-in-out infinite` }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
