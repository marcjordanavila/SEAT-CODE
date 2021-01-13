import * as actionTypes from "./actionTypes"

export function addCity(city: ICities) {
  const action: CityAction = {
    type: actionTypes.ADD_CITY,
    city,
  }
  return simulateHttpRequest(action)
}

export function removeCity(city: ICities) {
  const action: CityAction = {
    type: actionTypes.REMOVE_CITY,
    city,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(city: CityAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(city)
    }, 500)
  }
}