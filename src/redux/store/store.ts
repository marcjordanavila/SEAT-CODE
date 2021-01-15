import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

import { CityAction, CityState, CitiesAction, DispatchCityType ,SortAction } from "../../models/city";

export const store: Store<CityState, CityAction | CitiesAction | SortAction> & {
  dispatch: DispatchCityType;
} = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
