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
import ProductCard from "../home/ProductCard";
import Pagination from "react-js-pagination";
// import Slider from "@material-ui/core/Slider";
// import { Typography } from "@material-ui/core";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  // const [price, setprice] = useState(0, 300000);
  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // const priceHandler = (e, newValue) => {
  //   setprice(newValue);
  // };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage));
  }, [currentPage, dispatch, error, keyword]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
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

          {/* filter */}
          {/* <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              aria-labelledby='range-slider'
              valueLabelDisplay='auto'
              min={0}
              max={300000}
            />
          </div> */}

          {/* paginatin */}
          {resultPerPage < productCount && (
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
