import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/reducer";

export const store: Store<CityState, CityAction | CitiesAction> & {
  dispatch: DispatchCityType;
} = createStore(reducer, applyMiddleware(thunk));