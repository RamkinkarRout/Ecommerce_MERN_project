import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../images/logo.png";

const options = {
  burgerColorHover: "#ff8800",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#ff9721",
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
  link1ColorHover: "#ff8800",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconUrl: "/search",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconUrl: "/cart",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#ff8800",
  searchIconColorHover: "#ff8800",
  cartIconColorHover: "#ff8800",
  cartIconMargin: "1vmax",
};
const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
