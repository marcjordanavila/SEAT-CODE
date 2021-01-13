import * as actionTypes from "./actionTypes"

export function getCities(cities: ICities[]) {
  const action: CitiesAction = {
    type: actionTypes.GET_CITIES,
    payload: cities,
  }
  return (dispatch: DispatchCitiesType) => {
    dispatch(action)
  }
}

export function addCity(city: ICities) {
  const action: CityAction = {
    type: actionTypes.ADD_CITY,
    payload: city,
  }
  return (dispatch: DispatchCityType) => {
    dispatch(action)
  }
}

export function removeCity(city: ICities) {
  const action: CityAction = {
    type: actionTypes.REMOVE_CITY,
    payload: city,
  }
  return (dispatch: DispatchCityType) => {
    dispatch(action)
  }
}