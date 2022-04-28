import { Typography } from "@material-ui/core";
import React, { Fragment, useRef } from "react";
import MetaData from "../layout/MetaData";
import CheckOutStep from "./CheckOutStep";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./payment.css";
import { useAlert } from "react-alert";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Payment = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const { shippingInfo, cartItems } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.user);
  const orderInfo = JSON.parse(
    sessionStorage.getItem("orderInfo")
  );

  const payBtn = useRef(null);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/version1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
            },
          },
        }
      );

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "success") {
          alert.success("Payment Successful");
          history.push("/success");
        } else {
          alert.error("Payment Failed");
        }
      }
    } catch (err) {
      payBtn.current.disabled = false;
      alert.error(err.response.data.message);
    }
  };

  return (
    <Fragment>
      <MetaData title='Payment' />
      <CheckOutStep activeStep={2} />
      <div className='paymentContainer'>
        <form
          className='paymentForm'
          onSubmit={(e) => submitHandler(e)}
        >
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className='paymentInput' />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className='paymentInput' />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className='paymentInput' />
          </div>

          <input
            type='submit'
            value={`Pay - ₹${
              orderInfo && orderInfo.totalPrice
            }`}
            ref={payBtn}
            className='paymentFormBtn'
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
