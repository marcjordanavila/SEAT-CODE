import * as actionTypes from "./actionTypes"

import {
  ICities, CitiesAction, DispatchCitiesType, CityAction, DispatchCityType,
  SortAction, DispatchSortType
} from "../../models/city";

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

export function sortAsc(name: string) {
  const action: SortAction = {
    type: actionTypes.SORT_ASC,
    payload: name,
  }
  return (dispatch: DispatchSortType) => {
    dispatch(action)
  }
}

export function sortDesc(name: string) {
  const action: SortAction = {
    type: actionTypes.SORT_DESC,
    payload: name,
  }
  return (dispatch: DispatchSortType) => {
    dispatch(action)
  }
}