import { reducer } from "./reducer";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const middleWare = applyMiddleware(thunk);
export const store = createStore(reducer, middleWare);

store.subscribe(() => {
  console.log(store.getState());
});
