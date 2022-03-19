import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProducts,
} from "../../actions/productAction";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "../home/ProductCard";
import Pagination from "react-js-pagination";
import {
  Slider,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const catagories = [
  "Laptop",
  "Mobile",
  "Tablet",
  "Camera",
  "Television",
  "Headphone",
  "Speaker",
  "Earphone",
  "Watch",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 160000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [reset, setReset] = useState(false);
  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(
      getProducts(
        keyword,
        currentPage,
        price,
        category,
        ratings,
        reset
      )
    );
  }, [
    currentPage,
    dispatch,
    error,
    keyword,
    price,
    category,
    ratings,
    alert,
    reset,
  ]);
  let count = filteredProductCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"AMAZON -- PRODUCTS"} />
          <h2 className='productsHeading'>Products</h2>

          <div className='products'>
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
          </div>
          {/* Filter */}
          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={(e, value) => setPrice(value)}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={160000}
              style={{ color: "#ffc267" }}
            />

            <Typography>Categories</Typography>
            <ul className='catagoryBox'>
              {catagories.map((category) => (
                <li
                  className='category-link'
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <Box
              component={"fieldset"}
              mb={2}
              borderColor='transparent'
            >
              <Typography component={"legend"}>
                Ratings Above
              </Typography>
              <Rating
                name='simple-controlled'
                value={ratings}
                onChange={(event, newValue) => {
                  setRatings(newValue);
                }}
                onClick={() => setRatings(0)}
              />
            </Box>

            <Button
              variant='outlined'
              onClick={(e) => {
                if (reset === false) {
                  setCurrentPage(1);
                  setPrice([0, 160000]);
                  setCategory("");
                  setRatings(0);
                }
                return setReset(false);
              }}
              className='resetButton'
            >
              Reset
            </Button>
          </div>

          {/* Pagination */}
          {resultPerPage <= count && (
            <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText='>>>'
                prevPageText={"<<<"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            </div>
          )}

          {/* for no product */}
          {count === 0 && (
            <div className='noProduct'>
              <h2>No product found 😿</h2>

              <Link to='/' className='noProduct-link'>
                Back to Home
              </Link>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
