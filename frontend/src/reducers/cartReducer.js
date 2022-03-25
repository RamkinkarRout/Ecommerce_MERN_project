import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
} from "../constants/cartConstant";

export const cartReducer = (
  state = { cartItems: [] },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const items = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === items.product
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? items : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, items],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.product !== action.payload
        ),
      };

    default:
      return state;
  }
};