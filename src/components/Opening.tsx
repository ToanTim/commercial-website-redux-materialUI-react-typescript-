//external import
import { Box, Button, Fade, Slide, Typography } from "@mui/material";
import React, { useState } from "react";

//internal import
import "../style/Opening.scss";

const Opening = () => {
  const [showImage, setShowImage] = useState(true);
  const [divDisplay, setDivDisplay] = useState(true);
  const handleClick = () => {
    setShowImage(false);
    setTimeout(() => {
      setShowImage(false);
      setDivDisplay(false);
    }, 1000); // fade out for 2 seconds
  };

  const textOrder = [
    { timeOut: 2000, text: "Welcome to BeeHouse " },
    { timeOut: 3000, text: "Fast search with chatGPT" },
    { timeOut: 4000, text: "Everything you need with one click" },
    { timeOut: 5000, text: "Book, delivery, recieve within 5 minutes" },
  ];
  return (
    <div className={divDisplay ? "openning__div" : "openning__div-closed"}>
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
