import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import { NoPageScreen } from "./pages/NoPageScreen";
import { Container, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Opening from "./components/Opening";
function App() {
  return (
    <>
      <Opening />
      <Header />
      <main>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="products" element={<ProductScreen />} />
              <Route path="*" element={<NoPageScreen />} />
            </Routes>
          </BrowserRouter>
        </div>
      </main>
    </>
  );
}

export default App;
