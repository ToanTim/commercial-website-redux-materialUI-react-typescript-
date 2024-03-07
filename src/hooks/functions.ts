import { useNavigate } from "react-router-dom";
import { websiteRouterList } from "../misc/BaseVariables";
import { CategorySingleType, CategoryType, ProductType } from "../misc/Product";
import { addItem } from "./features/slices/CartSlice";
import { RootState } from "./features/store/store";
import {
  handleClickVariantPopUpWindow,
  useAppDispatch,
  useAppSelector,
} from "./hooks";
import {
  ActionCreatorWithPayload,
  Dispatch,
  ThunkAction,
} from "@reduxjs/toolkit";

export const handleFormErrors = (formData: any, errorNames: string[]) => {
  const errors: string[] = [];

  errorNames.forEach((errorName) => {
    switch (errorName) {
      case "nameEmpty":
        if (!formData.name) {
          errors.push("Name should not be empty");
        }
        break;
      case "nameString":
        if (typeof formData.name !== "string") {
          errors.push("Name must be a string");
        }
        break;
      case "passwordLength":
        if (formData.password.length < 4) {
          errors.push("Password must be longer than or equal to 4 characters");
        }
        break;
      case "passwordEmpty":
        if (!formData.password) {
          errors.push("Password should not be empty");
        }
        break;
      case "passwordFormat":
        if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
          errors.push("Password must contain only letters and numbers");
        }
        break;
      case "avatarEmpty":
        if (!formData.avatar) {
          errors.push("Avatar should not be empty");
        }
        break;
      case "avatarFormat":
        if (!/^(ftp|http|https):\/\/[^ "]+$/.test(formData.avatar)) {
          errors.push("Avatar must be a URL address");
        }
        break;
      case "invalidProductName":
        if (!/^[a-zA-Z0-9\s\-&/]*$/.test(formData.productName)) {
          errors.push("Invalid product name");
        }
        break;
      case "InvalidCategoryName":
        if (!/^[a-zA-Z0-9\s\-&/]*$/.test(formData.productName)) {
          errors.push("Invalid category name");
        }
        break;
      case "minimumPriceValueError":
        if (formData.minimumPrice < 0) {
          errors.push("Minimum price can not be low 0");
        }
        break;
      case "maximumPriceValueError":
        if (formData.maximumPrice < 0) {
          errors.push("Maximum price can not be low 0");
        }
        break;
      case "minimumMoreThanMaximum":
        if (formData.minimumPrice > formData.maximumPrice) {
          errors.push("Minimum can not be more than maximum");
        }
        break;

      default:
        break;
    }
  });

  return errors;
};

export const handleTransformUrlImage1 = (entity: any[]) => {
  return entity.map((item) => item.replace(/\[|\]/g, ""));
};

//replace with this function if it cause error with handleTransformUrlImage function

export const handleTransformUrlImage2 = (entity: any[]) => {
  return entity.map((item) => JSON.parse(item.replace(/\[|\]/g, "")));
};

export const handleTransformUrlImage = (entity: any[]) => {
  if (Array.isArray(entity) && typeof entity[0] === "string") {
    return handleTransformUrlImage1(entity);
  } else {
    return handleTransformUrlImage2(entity);
  }
};

export const scrollToTop = () => {
  // fucntion to scroll to the top after click pagination page
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Optional smooth scrolling behavior
  });
};

// Sort products from lowest to highest price
export const sortProductsLowToHigh = (
  products: ProductType[]
): ProductType[] => {
  return products.slice().sort((a, b) => a.price - b.price);
};

// Sort products from highest to lowest price
export const sortProductsHighToLow = (
  products: ProductType[]
): ProductType[] => {
  return products.slice().sort((a, b) => b.price - a.price);
};

export const debounceFunction = <T>(
  dispatch: Dispatch<any>,
  actionCreator: (...args: any[]) => ThunkAction<void, RootState, null, any>,
  ms: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      dispatch(actionCreator(...args));
    }, ms);
  };
};

export const getCategoryIDFromName = (
  categoryName: string,
  categories: CategorySingleType[]
): string => {
  const category = categories.find((cat) => cat.name === categoryName);
  return category ? `${category.id}` : "";
};

export const getNameFromCategoryID = (
  categoryId: string,
  categories: CategorySingleType[]
): string => {
  const category = categories.find((cat) => cat.id === parseInt(categoryId));
  return category ? category.name : "";
};
