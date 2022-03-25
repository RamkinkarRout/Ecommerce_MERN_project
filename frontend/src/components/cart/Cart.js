import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import CartItemCard from "./CartItemCard";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  addItemsToCart,
  removeCartItem,
} from "../../actions/cartAction";
import { useAlert } from "react-alert";

const Cart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity > 0) {
      dispatch(addItemsToCart(id, newQuantity));
    } else {
      alert.error("You can not add less than 1 quantity");
    }
  };
  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock < newQuantity) {
      alert.error(
        "You can not add more than available quantity"
      );
      return;
    }
    dispatch(addItemsToCart(id, newQuantity));
  };

  const removeItemFromCart = (id) => {
    dispatch(removeCartItem(id));
    // console.log(id);
  };

  return (
    <Fragment>
      <div className='cartPage'>
        {cartItems && cartItems.length > 0 && (
          <div className='cartHeader'>
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
        )}

        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              className='cartContainer'
              key={item.product}
            >
              <CartItemCard
                product={item.product}
                price={item.price}
                name={item.name}
                image={item.image}
                quantity={item.quantity}
                removeItemFromCart={removeItemFromCart}
              />
              <div className='cartInput'>
                <button
                  onClick={() =>
                    decreaseQuantity(
                      item.product,
                      item.quantity
                    )
                  }
                >
                  -
                </button>
                <input
                  type='number'
                  value={item.quantity}
                  readOnly
                />
                <button
                  onClick={() =>
                    increaseQuantity(
                      item.product,
                      item.quantity,
                      item.stock
                    )
                  }
                >
                  +
                </button>
              </div>
              <p className='cartSubTotal'>{`₹${
                item.price * item.quantity
              }`}</p>
            </div>
          ))
        ) : (
          <div className='emptyCart'>
            <RemoveShoppingCartIcon />

            <Typography>No Product in Your Cart</Typography>
            <Link to='/products'>View Products</Link>
          </div>
        )}

        {cartItems && cartItems.length > 0 && (
          <div className='cartGrossTotal'>
            <div></div>
            <div className='cartGrossTotalBox'>
              <p>Gross Total</p>
              <p>
                {`₹
                  ${cartItems.reduce((a, c) => {
                    return a + c.price * c.quantity;
                  }, 0)}`}
              </p>
            </div>
            <div></div>
            <div className='checkOutBtn'>
              <button>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
