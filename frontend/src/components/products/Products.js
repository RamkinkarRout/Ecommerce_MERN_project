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
import { Slider, Typography } from "@material-ui/core";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 160000]);
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage, price));
  }, [currentPage, dispatch, error, keyword, price]);

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
            />
          </div>

          {/* Pagination */}
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
