import * as actionTypes from "../actions/actionTypes"

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

const reducer = (
  state: CityState = initialState,
  action: CityAction | CitiesAction
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
  return state
}

export default reducer