export interface ICities {
  id: number,
  name: string,
  country: string,
  population: number,
  latitude: number,
  longitude: number
}

export enum CityProperties {
  name = "name",
  country = "country",
  population = "population",
  latitude = "latitude",
  longitude = "longitude"
}

export interface Action {
  type: string
}

export type CityState = {
  cities: ICities[]
}

export interface CityAction extends Action  {
  payload: ICities
}

export interface CitiesAction extends Action  {
  payload: ICities[]
}

export interface SortAction extends Action {
  payload: string
}

export type DispatchCityType = (args: CityAction) => CityAction
export type DispatchCitiesType = (args: CitiesAction) => CitiesAction
export type DispatchSortType = (args: SortAction) => SortAction