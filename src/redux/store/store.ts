import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/reducer";

export const store: Store<CityState, CityAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));