interface ICities {
  id: number,
  name: string,
  country: string,
  population: number,
  latitude: number,
  longitude: number
}

type CityState = {
  cities: ICities[]
}

type CityAction = {
  type: string
  city: ICity
}

type DispatchType = (args: CityAction) => CityAction