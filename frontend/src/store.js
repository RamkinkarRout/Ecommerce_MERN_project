import {
  createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
});

let intialState = {};

const middleware = [thunk];

const stroe = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default stroe;
