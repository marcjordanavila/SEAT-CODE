interface ICities {
  id: number,
  name: string,
  country: string,
  population: number,
  latitude: number,
  longitude: number
}

interface Action {
  type: string
}

type CityState = {
  cities: ICities[]
}

interface CityAction extends Action  {
  payload: ICity
}

interface CitiesAction extends Action  {
  payload: ICities[]
}

type DispatchCityType = (args: CityAction) => CityAction
type DispatchCitiesType = (args: CitiesAction) => CitiesAction