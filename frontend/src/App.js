import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Webfont from "webfontloader";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/productDetails/ProductDetails";
import Products from "./components/products/Products.js";
import Search from "./components/products/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";

function App() {
  useEffect(() => {
    Webfont.load({
      google: {
        families: [
          "Roboto:300,400,500,700",
          "sans-serif",
          "Droid Sans",
          "Chilanka",
        ],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Route path='/' exact component={Home} />
      <Route
        path='/product/:id'
        exact
        component={ProductDetails}
      />

      <Route path='/products' exact component={Products} />
      <Route
        path='/products/:keyword'
        component={Products}
      />
      <Route path='/search' exact component={Search} />
      <Route path='/login' exact component={LoginSignUp} />
      <Footer />
    </Router>
  );
}

export default App;
