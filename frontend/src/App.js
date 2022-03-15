import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Webfont from "webfontloader";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";

function App() {
  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />

      <Footer />
    </Router>
  );
}

export default App;
