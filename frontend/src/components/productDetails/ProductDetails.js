import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import Loader from "../layout/loader/Loader";
import MetaData from "../layout/MetaData";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const [quantiy, setquantiy] = useState(1);

  const increaseQuantity = () => {
    if (quantiy < product.stock) {
      setquantiy(quantiy + 1);
    } else {
      alert.show(
        "You can not add more than available quantity"
      );
    }
  };

  const decreaseQuantity = () => {
    if (quantiy > 1) {
      setquantiy(quantiy - 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantiy));
    alert.show("Item added to cart");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(match.params.id));
  }, [alert, dispatch, error, match.params.id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#ffa41c",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData
            title={`${product.name} -- ECOMMERCE`}
          />
          <div className='ProductDetails'>
            <div>
              <Carousel width={"100%"}>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className='CarouselImage'
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className='detailsBlock-2'>
                <ReactStars {...options} />
                <span className='detailsBlock-2-span'>
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className='detailsBlock-3'>
                <h1>{`₹${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>
                    <button
                      onClick={() => decreaseQuantity()}
                    >
                      -
                    </button>
                    <input
                      readOnly
                      type='number'
                      value={quantiy}
                    />
                    <button
                      onClick={() => increaseQuantity()}
                    >
                      +
                    </button>
                  </div>
                  <button
                    disabled={
                      product.Stock < 1 ? true : false
                    }
                    onClick={() => addToCartHandler()}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b
                    className={
                      product.Stock < 1
                        ? "redColor"
                        : "greenColor"
                    }
                  >
                    {product.Stock < 1
                      ? "OutOfStock"
                      : "InStock"}
                  </b>
                </p>
              </div>

              <div className='detailsBlock-4'>
                Description : <p>{product.description}</p>
              </div>

              <button
                onClick={() => {}}
                className='submitReview'
              >
                Submit Review
              </button>
            </div>
          </div>

          <h3 className='reviewsHeading'>REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard
                    review={review}
                    key={review._id}
                  />
                ))}
            </div>
          ) : (
            <p className='noReviews'>No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
