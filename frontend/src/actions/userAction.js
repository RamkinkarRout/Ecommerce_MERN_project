import {
  ALL_LOGIN_FAILURE,
  ALL_LOGIN_SUCCESS,
  ALL_LOGIN_REQUEST,
  CLEAR_ERROR,
  ALL_SIGNUP_USER_FAILURE,
  ALL_SIGNUP_USER_REQUEST,
  ALL_SIGNUP_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

//login
export const login =
  (email, password) => async (dispatch) => {
    try {
      dispatch({ type: ALL_LOGIN_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
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

//signup

export const signUp = (userData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_SIGNUP_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(
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

//load user

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.get(
      "/api/version1/me",
      config
    );

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

//logout user

export const logOut = () => async (dispatch) => {
  try {
    await axios.get("/api/version1/logout");

    dispatch({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOG_OUT_FAILURE,
      payload: error.response.data.message,
    });
  }
};
//clearing errors

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
