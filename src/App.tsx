import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { AddCityComp } from "./components/addCityComp";
import { Table } from "./components/table";
import { Dispatch } from "redux";
import { addCity, removeCity } from "./redux/actions/actionCreators";

import "./App.css";

const App: React.FC = () => {
  const cities: ICities[] = useSelector(
    (state: CityState) => state.cities,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const saveCity = React.useCallback(
    (city: ICities) => dispatch(addCity(city)),
    [dispatch]
  );

  //const tableData =

  return (
    <main>
      <h1>My Cities</h1>
      <AddCityComp saveCity={saveCity} />
      <Table content={cities} title="Ciudades" removeField={removeCity} />
    </main>
  );
};

export default App;
