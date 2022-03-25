import React from "react";

import { Link } from "react-router-dom";

import "./cartItemCard.css";

const CartItemCard = ({
  product,
  name,
  price,
  image,
  removeItemFromCart,
}) => {
  return (
    <div className='CartItemCard'>
      <img src={image} alt={name} />

      <div>
        <Link to={`/product/${product}`}> {name} </Link>
        <span>{`Price ₹${price}`}</span>
        <p onClick={() => removeItemFromCart(product)}>
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
