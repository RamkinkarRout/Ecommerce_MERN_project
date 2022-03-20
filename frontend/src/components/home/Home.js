import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import {
  clearErrors,
  getProducts,
} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";

const backgroundImageURL = [
  "http://trumpwallpapers.com/wp-content/uploads/Amazon-Wallpaper-08-3888-x-2592.jpg",
  "http://trumpwallpapers.com/wp-content/uploads/Amazon-Wallpaper-33-3840-x-2160.jpg",
  "http://trumpwallpapers.com/wp-content/uploads/Amazon-Wallpaper-26-4288-x-2848.jpg",
  "http://trumpwallpapers.com/wp-content/uploads/Amazon-Wallpaper-24-2560-x-1600.jpg",
  "http://trumpwallpapers.com/wp-content/uploads/Amazon-Wallpaper-15-1920-x-1200.jpg",
  "http://trumpwallpapers.com/wp-content/uploads/Amazon-Wallpaper-09-1920-x-1200.jpg",
  "https://besthqwallpapers.com/Uploads/15-10-2021/178195/amazon-carbon-logo-4k-grunge-art-carbon-background-creative.jpg",
  "https://wallpaperaccess.com/full/1308165.jpg",
  "https://m.wsj.net/video/20181218/121818amazonhacks1/121818amazonhacks1_1920x1080.jpg",
];

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  const getImage = () => {
    const random = Math.floor(
      Math.random() * backgroundImageURL.length
    );
    console.log(backgroundImageURL[random]);
    return backgroundImageURL[random];
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [alert, dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='AMAZON -- ECOMMERCE' />

          <div
            className='banner'
            style={{
              backgroundImage: `url(${getImage()})`,
            }}
          >
            <h1>Welcome to Amazon</h1>
            <a href='#container'>
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className='homeHeading'>Featured Products</h2>

          <div className='container' id='container'>
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
