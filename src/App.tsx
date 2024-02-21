import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import { NoPageScreen } from "./pages/NoPageScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="products" element={<ProductScreen />} />
        <Route path="*" element={<NoPageScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
