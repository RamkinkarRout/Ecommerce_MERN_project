import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";

const product = {
  name: "Apple iPhone 11 Pro Max (64GB) - Midnight Green",
  images: [
    {
      src: "https://m.media-amazon.com/images/I/61ers6OzvUL._SL1024_.jpg",
    },
  ],
  price: "₹ 8,999",
  _id: "5f5e8f9b9c9d440000c8b8f9",
};
const Home = () => {
  return (
    <Fragment>
      <div className='banner'>
        <p>Welcome to Amazon</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href='#container'>
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className='homeHeading'>Featured Products</h2>

      <div className='container' id='container'>
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />

        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
