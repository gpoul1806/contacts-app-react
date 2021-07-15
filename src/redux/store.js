import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducer from "./actions";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger))
);
