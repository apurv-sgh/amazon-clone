import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CartPage from "./Pages/CartPage";
import ProductPaga from "./Pages/ProductPaga";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Context from "./ContextApi/Context";

function App() {
  return (
    <>
      <Context>
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path={`/ProductPaga/:id`} element={<ProductPaga />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/OrderSuccess/:orderId" element={<OrderSuccess />} />
        </Routes>
        <Footer />
      </Context>
    </>
  );
}

export default App;