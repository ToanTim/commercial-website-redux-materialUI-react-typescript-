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

function App() {
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

              {/* route to dynamic webpage  */}
              <Route path="users/:id" element={<UserProfileScreen />} />

              {/* error pages */}
              <Route path="*" element={<NoPageScreen />} />
            </Routes>
          </BrowserRouter>
        </div>
      </main>
    </>
  );
}

export default App;
