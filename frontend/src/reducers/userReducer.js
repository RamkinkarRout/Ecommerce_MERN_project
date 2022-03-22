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
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_RESET,
} from "../constants/userConstants";

export const userReducer = (
  state = { user: {} },
  action
) => {
  switch (action.type) {
    case ALL_LOGIN_REQUEST:
    case ALL_SIGNUP_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case ALL_LOGIN_SUCCESS:
    case ALL_SIGNUP_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOG_OUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
      };

    case ALL_LOGIN_FAILURE:
    case ALL_SIGNUP_USER_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOG_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isUpdated: false,
      };
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
