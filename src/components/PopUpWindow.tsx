import React from "react";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

interface PopUpWindowProps {
  children: React.ReactNode;
}

const PopUpWindow: React.FC<PopUpWindowProps> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };

  const handleClickVariant = (variant: VariantType) => () => {
    enqueueSnackbar("This is a success message!", { variant });
  };

  return (
    <SnackbarProvider maxSnack={3}>
      {React.cloneElement(children as React.ReactElement, {
        handleClick,
        handleClickVariant,
      })}
    </SnackbarProvider>
  );
};

export default PopUpWindow;
