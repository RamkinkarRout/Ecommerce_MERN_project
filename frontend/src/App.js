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
      <Footer />
    </Router>
  );
}

export default App;
