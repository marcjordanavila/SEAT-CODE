import * as actionTypes from "../actions/actionTypes"

const initialState: CityState = {
  cities: [
    {
      id: 1,
      name: "Barcelona",
      country: "España",
      population: 1000,
      latitude: 1,
      longitude: 1
    }
  ],
}

const reducer = (
  state: CityState = initialState,
  action: CityAction
): CityState => {
  switch (action.type) {
    case actionTypes.ADD_CITY:
      const newCity: ICities = {
        id: Math.random(), // not really unique
        name: action.city.name,
        country: action.city.country,
        population: action.city.population,
        latitude: action.city.latitude,
        longitude: action.city.longitude
      }
      return {
        ...state,
        cities: state.cities.concat(newCity),
      }
    case actionTypes.REMOVE_CITY:
      const updatedCities: ICities[] = state.cities.filter(
        city => city.id !== action.city.id
      )
      return {
        ...state,
        cities: updatedCities,
      }
  }
  return state
}

export default reducer