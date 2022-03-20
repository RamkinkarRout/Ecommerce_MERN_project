import {
  ALL_LOGIN_FAILURE,
  ALL_LOGIN_SUCCESS,
  ALL_LOGIN_REQUEST,
  CLEAR_ERROR,
  ALL_SIGNUP_USER_FAILURE,
  ALL_SIGNUP_USER_REQUEST,
  ALL_SIGNUP_USER_SUCCESS,
} from "../constants/userConstants";

import axios, { Axios } from "axios";

export const login =
  (email, password) => async (dispatch) => {
    try {
      dispatch({ type: ALL_LOGIN_REQUEST });

      const config = {
        Headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/version1/login",
        { email, password },
        config
      );
      dispatch({
        type: ALL_LOGIN_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: ALL_LOGIN_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

//clearing errors

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

//signup

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_SIGNUP_USER_REQUEST });

    const config = {
      Headers: { "Content-Type": "application/json" },
    };

    const { data } = await Axios.post(
      "/api/version1/register",
      userData,
      config
    );

    dispatch({
      type: ALL_SIGNUP_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: ALL_SIGNUP_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};
