import * as actionTypes from "../actions/actionTypes"

import {
  ICities, CitiesAction, CityState, CityAction, Action,
  SortAction, CityProperties
} from "../../models/city";

const initialState: CityState = {
  cities: [],
}

// The Type Guard Functions
function isCityAction(action: Action): action is CityAction {
  return (action.type === actionTypes.ADD_CITY || action.type === actionTypes.REMOVE_CITY)
}
function isCitiesAction(action: Action): action is CitiesAction {
  return (action.type === actionTypes.GET_CITIES)
}
function isSortAction(action: Action): action is SortAction {
  return (action.type === actionTypes.SORT_ASC || action.type === actionTypes.SORT_DESC)
}

const reducer = (
  state: CityState = initialState,
  action: CityAction | CitiesAction | SortAction
): CityState => {
  if (isCityAction(action)) {
    switch (action.type) {
      case actionTypes.ADD_CITY:
        const newCity: ICities = {
          id: action.payload.id, // not really unique
          name: action.payload.name,
          country: action.payload.country,
          population: action.payload.population,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        }
        return {
          ...state,
          cities: state.cities.concat(newCity),
        }
      case actionTypes.REMOVE_CITY:
        const updatedCities: ICities[] = state.cities.filter(
          city => city.id !== action.payload.id
        )
        return {
          ...state,
          cities: updatedCities,
        }
    }
  }
  if (isCitiesAction(action)) {
    switch (action.type) {
      case actionTypes.GET_CITIES:
        return {
          ...state,
          cities: action.payload
        }
    }
  }
  if (isSortAction(action)) {
    const cityPayload = action.payload as CityProperties;
    switch (action.type) {
      case actionTypes.SORT_ASC:
        return {
          ...state,
          cities: state.cities.sort((a, b) => 
            a[cityPayload] > b[cityPayload] ? -1 : b[cityPayload] > a[cityPayload] ? 1 : 0
          )
        }
      case actionTypes.SORT_DESC:
        return {
          ...state,
          cities: state.cities.sort((a, b) => 
            a[cityPayload] < b[cityPayload] ? -1 : b[cityPayload] < a[cityPayload] ? 1 : 0
          )
        }
    }
  }
  return state
}

export default reducer