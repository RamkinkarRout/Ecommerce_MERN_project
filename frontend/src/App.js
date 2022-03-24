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
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/header/UserOptions.js";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
function App() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );

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

      <Route path='/login' exact component={LoginSignUp} />
      <Footer />
    </Router>
  );
}

export default App;
