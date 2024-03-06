//external
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//internal
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import { NoPageScreen } from "./pages/NoPageScreen";
import { Container, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Opening from "./components/Opening";
import UserProfileScreen from "./pages/UserProfileScreen";
import AuthenticationScreen from "./pages/AuthenticationScreen";
import LoadingScreen from "./pages/LoadingScreen";
import ProductDetailByIdScreen from "./pages/ProductDetailByIdScreen";
import { DataBroswerName } from "./misc/BaseVariables";
import {
  clearUserStateFromStorage,
  useAppSelector,
  useCheckAndLoadDataFromStorage,
} from "./hooks/hooks";
import ShoppingCartScreen from "./pages/ShoppingCartScreen";
import { RootState } from "./hooks/features/store/store";

function App() {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.authentication.loggedIn
  );

  //TODO: fix bug: after few hour, application auto log out, userStateData still avaiable, guess: isLoggedIn auto change to false
  if (!isLoggedIn) {
    const keyNameArrayToClear = Object.values(DataBroswerName).map(
      (item) => item.keyName
    );

    //Clear data from storage brower
    keyNameArrayToClear.map((item) => {
      clearUserStateFromStorage(item);
    });
  }
  const keyNameBroswerStorageArray = Object.values(DataBroswerName).map(
    (item) => item.keyName
  );

  //update state when startif there is any
  useCheckAndLoadDataFromStorage(keyNameBroswerStorageArray);

  return (
    <>
      <main>
        <div>
          <BrowserRouter>
            <Opening />
            <Header />

            <Routes>
              {/* route to static pages */}
              <Route path="/" element={<HomeScreen />} />
              <Route path="products" element={<ProductScreen />} />
              <Route path="authentication" element={<AuthenticationScreen />} />
              <Route path="cart" element={<ShoppingCartScreen />} />
              {/* route to dynamic webpage  */}
              <Route path="users/:id" element={<UserProfileScreen />} />
              <Route
                path="products/:id"
                element={<ProductDetailByIdScreen />}
              />
              {/* error pages */}
              <Route path="*" element={<NoPageScreen />} />\{/* test Route */}
              {/* <Route path="/test" element={<PopUpWindow />} /> */}
            </Routes>
          </BrowserRouter>
        </div>
      </main>
    </>
  );
}

export default App;
