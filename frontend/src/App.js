import React, { useEffect, useState } from "react";
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
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/header/UserOptions.js";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/cart/Cart.js";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess.js";
import MyOrders from "./components/orders/MyOrders.js";

function App() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [stripePublicKey, setStripePublicKey] =
    useState("");

  async function getStripePublicKey() {
    const { data } = await axios.get(
      "/api/version1/stripePublicKey"
    );
    setStripePublicKey(data.stripe_public_key);
  }

  // console.log("stripe", stripePublicKey);

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

    store.dispatch(loadUser());

    getStripePublicKey();
  }, []);
  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

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

      <ProtectedRoute
        path={"/account"}
        exact
        component={Profile}
      />

      <ProtectedRoute
        exact
        path={`/me/update/:id`}
        component={UpdateProfile}
      />

      <ProtectedRoute
        path='/me/password/update'
        component={UpdatePassword}
        exact
      />
      <Route
        path='/password/forgot'
        component={ForgotPassword}
        exact
      />

      <Route
        exact
        path={`/password/reset/:token`}
        component={ResetPassword}
      />

      <Route path='/cart' component={Cart} exact />

      <Route path='/login' exact component={LoginSignUp} />
      <ProtectedRoute
        path='/shipping'
        component={Shipping}
        exact
      />

      <ProtectedRoute
        path='/order/confirm'
        component={ConfirmOrder}
        exact
      />

      {stripePublicKey && (
        <Elements stripe={loadStripe(stripePublicKey)}>
          <ProtectedRoute
            exact
            path='/process/payment'
            component={Payment}
          />
        </Elements>
      )}

      <ProtectedRoute
        exact
        path='/success'
        component={OrderSuccess}
      />
      <ProtectedRoute
        exact
        path='/orders'
        component={MyOrders}
      />

      <Footer />
    </Router>
  );
}

export default App;
