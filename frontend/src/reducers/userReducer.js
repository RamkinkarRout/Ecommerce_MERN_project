import {
  ALL_LOGIN_FAILURE,
  ALL_LOGIN_SUCCESS,
  ALL_LOGIN_REQUEST,
  CLEAR_ERROR,
} from "../constants/userConstants";

export const userReducer = (
  state = { user: {} },
  action
) => {
  switch (action.type) {
    case ALL_LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case ALL_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case ALL_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
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
