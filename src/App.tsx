import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { AddCityComp } from "./components/addCityComp";
import { Table } from "./components/table";
import { Dispatch } from "redux";
import { getCities, addCity, removeCity } from "./redux/actions/actionCreators";

import "./App.css";
import axios from "axios";

const App: React.FC = () => {
  const [citiesAreLoaded, setCitiesAreLoaded] = React.useState<boolean>(false);
  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState(
    ""
  );

  useEffect(() => {
    if (!citiesAreLoaded) {
      axios
        .get<ICities[]>("http://localhost:8080/cities", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          getCitiesInformation(response.data);
          setLoading(false);
          setCitiesAreLoaded(true);
        })
        .catch((err) => {
          const error =
            err.response.status === 404
              ? "Resource not found"
              : "An unexpected error has occurred";
          setError(err);
          setLoading(false);
        });
    }
  });

  const cities: ICities[] = useSelector(
    (state: CityState) => state.cities,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const saveCity = React.useCallback(
    (city: ICities) => dispatch(addCity(city)),
    [dispatch]
  );

  const getCitiesInformation = React.useCallback(
    (cities: ICities[]) => dispatch(getCities(cities)),
    [dispatch]
  );

  return (
    <main>
      <h1>My Cities</h1>
      {error && <p className="error">{error}</p>}
      <AddCityComp saveCity={saveCity} cities={cities} />
      <Table content={cities} title="Ciudades" removeField={removeCity} />
    </main>
  );
};

export default App;
