import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckOutStep from "./CheckOutStep";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state.user);

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckOutStep activeStep={1} />
      <div className='confirmOrderPage'>
        <div>
          <div className='consfirmShippingArea'>
            <div className='confirmShippingAreaBoc'>
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phone}</span>
              </div>{" "}
              <div>
                <p>Address:</p>
                <span>{shippingInfo.address}</span>
              </div>
            </div>
          </div>

          <div className='confirmCartItem'>
            <Typography>Your Cart Items</Typography>
            <div className='confirmCartItemsContainer'>
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt='Product' />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                    <span>
                      {item.count} x ₹${item.price} ={" "}
                      <b>{`₹${
                        item.price * item.quantity
                      }`}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* /////////////////////////////// */}

        <div></div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
