import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderReceived from "./pages/OrderReceived";
import Launch from "./pages/Launch";


function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Launch />} />
          {/* next: /shop, /shop/:category, /product/:id, /cart, /checkout */}
          <Route path="*" element={<div className="wrap" style={{ padding: "4rem 0" }}><h1>Page not found</h1></div>} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-received" element={<OrderReceived />} />
          <Route path="/launch" element={<Launch />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}