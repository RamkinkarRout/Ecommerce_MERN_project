import axios from "axios";

import {
  ALL_PRODUCT_FAILURE,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERROR,
} from "../constants/productConstants";

//product reducer
export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 160000],
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      let link = `/api/version1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link += `&catagory=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

//get product details reducer

export const getProductDetails =
  (id) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      });
      const { data } = await axios.get(
        `/api/version1/product/${id}`
      );
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

//clearing Errors
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
