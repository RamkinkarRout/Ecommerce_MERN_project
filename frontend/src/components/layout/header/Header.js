import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

<ion-icon name='cart-outline'></ion-icon>;

const options = {
  burgerColor: "rgb(255, 186, 96)",
  burgerColorHover: "#ff9100",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#ffa41c",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#ffa41c",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconUrl: "/search",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconUrl: "/cart",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#ffa41c",
  searchIconColorHover: "#ffa41c",
  cartIconColorHover: "#ffa41c",
  cartIconMargin: "1vmax",
};
const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
