import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { AddCityComp } from "./components/addCityComp";
import { Table } from "./components/table";
import { Dispatch } from "redux";
import { getCities, addCity, removeCity } from "./redux/actions/actionCreators";
import { ICities, CityState } from "./models/city";
import { getDBCities } from "./core/api";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [citiesAreLoaded, setCitiesAreLoaded] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (!citiesAreLoaded) {
      getDBCities()
        .then((response) => {
          getCitiesInformation(response.data);
          setCitiesAreLoaded(true);
        })
        .catch((err) => {
          const error =
            err.response?.status === 404
              ? "Resource not found"
              : "Check if database is running";
          setError(error);
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
    <div className="container">
      <div className="col-12 mt-5">
        {error && <p className="error">{error}</p>}
        <Table content={cities} title="Ciudades" removeField={removeCity} />
        <AddCityComp saveCity={saveCity} cities={cities} />
      </div>
    </div>
  );
};

export default App;
