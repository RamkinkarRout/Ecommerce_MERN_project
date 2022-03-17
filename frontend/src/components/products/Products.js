import React, { Fragment, useEffect } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProducts,
} from "../../actions/productAction";
import Loader from "../layout/loader/Loader";
import ProductCard from "../home/ProductCard";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword));
  }, [dispatch, error, keyword]);
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
