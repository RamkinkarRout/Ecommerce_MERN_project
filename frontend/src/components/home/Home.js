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
  "https://wallpaperbat.com/img/189732-desembaralhe-black-wallpaper-amazon.jpg",
  "https://bgr.com/wp-content/uploads/2019/11/amazon-sign-black-friday-deals.jpg",
  "https://wallpaperaccess.com/full/1308165.jpg",
  "https://m.wsj.net/video/20181218/121818amazonhacks1/121818amazonhacks1_1920x1080.jpg",
  "https://cdn.mos.cms.futurecdn.net/NpEXSYBYReu4ovAXMm45o6.jpg",
  "https://bgr.com/wp-content/uploads/2021/05/amazon-sign.jpg?quality=82&strip=all&w=1920&h=1080&crop=1",
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
            <h1>Welcome to Amazon</h1>\
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
