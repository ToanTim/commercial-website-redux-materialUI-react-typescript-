import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

type Image = string;

interface ImageSwiperProps {
  images: Image[];
}

const ImageSwiper = ({ images }: { images: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Button onClick={handlePrevImage}>Previous</Button>
        <Typography variant="body1">
          {currentImageIndex + 1} / {images.length}
        </Typography>
        <Button onClick={handleNextImage}>Next</Button>
      </Box>
      <img
        src={images[currentImageIndex]}
        alt={`Product Image ${currentImageIndex}`}
      />
    </Box>
  );
};

export default ImageSwiper;
