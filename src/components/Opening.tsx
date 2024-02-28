import { Box, Button, Fade, Slide, Typography } from "@mui/material";
import React, { useState } from "react";
import pictureTest from "../pages/test.jpg";
import "../style/Opening.scss";
import { PhotoAlbum } from "@mui/icons-material";
const Opening = () => {
  const [showImage, setShowImage] = useState(true);
  const handleClick = () => {
    setShowImage(false);
    setTimeout(() => {
      setShowImage(false);
    }, 4000); // fade out for 2 seconds
  };

  const textOrder = [
    { timeOut: 2000, text: "Welcome to YourHouse " },
    { timeOut: 3000, text: "Fast search with chatGPT" },
    { timeOut: 4000, text: "Everything you need with one click" },
    { timeOut: 5000, text: "Book, delivery, recieve within 5 minutes" },
  ];
  return (
    <div className="openning__div">
      <Fade in={showImage}>
        <div className="openning__fade-image_overlay" onClick={handleClick}>
          <div className="openning__fade-image_overlay-content">
            {textOrder.map((item) => {
              return (
                <Slide
                  direction="left"
                  in
                  mountOnEnter
                  unmountOnExit
                  timeout={item.timeOut}
                >
                  <Typography variant="h4">{item.text}</Typography>
                </Slide>
              );
            })}
            <Slide
              direction="down"
              in
              mountOnEnter
              unmountOnExit
              timeout={6000}
            >
              <Button
                variant="contained"
                className="openning__fade-image_overlay-content-button"
              >
                <Typography variant="h4">Shop now</Typography>
              </Button>
            </Slide>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Opening;
