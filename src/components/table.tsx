import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import axios from "axios";

import { ICities, CityProperties } from "../models/city";
import { sortAsc, sortDesc } from "../redux/actions/actionCreators";

type Props = {
  content: ICities[];
  title: string;
  removeField: (city: ICities) => void;
};

// enum CityProperties {
//   name = "name",
//   country = "country",
//   population = "population",
//   latitude = "latitude",
//   longitude = "longitude",
// }

export const Table: React.FC<Props> = ({ content, title, removeField }) => {
  const [error, setError] = React.useState<string>("");
  const [sortAscState, setSortAscState] = React.useState<boolean>(true);

  const dispatch: Dispatch<any> = useDispatch();

  const deleteField = (field: ICities) => {
    let id = field.id;
    axios
      .delete(`http://localhost:8080/cities/${id}`)
      .then(() => {
        deleteFieldRedux(field);
      })
      .catch((err) => {
        const error =
          err.response.status === 404
            ? "Resource not found"
            : "An unexpected error has occurred";
        setError(error);
      });
  };

  const deleteFieldRedux = React.useCallback(
    (city: ICities) => dispatch(removeField(city)),
    [dispatch, removeField]
  );

  const sortFieldAsc = React.useCallback(
    (field: string) => dispatch(sortAsc(field)),
    [dispatch]
  );

  const sortFieldDesc = React.useCallback(
    (field: string) => dispatch(sortDesc(field)),
    [dispatch]
  );

  const sortField = (field: string) => {
    if (sortAscState) {
      sortFieldAsc(field);
    } else {
      sortFieldDesc(field);
    }
    setSortAscState(!sortAscState);
  };

  return (
    <div className="mb-5">
      {error && <p className="error">{error}</p>}
      <h1 className="text-center mb-4">{title}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th onClick={() => sortField(CityProperties.name)}>{`Ciudad`}</th>
            <th onClick={() => sortField(CityProperties.country)}>{`País`}</th>
            <th
              onClick={() => sortField(CityProperties.population)}
            >{`Población`}</th>
            <th
              onClick={() => sortField(CityProperties.latitude)}
            >{`Latitud`}</th>
            <th
              onClick={() => sortField(CityProperties.longitude)}
            >{`Longitud`}</th>
            <th>{``}</th>
          </tr>
          {content.map((field) => {
            return (
              <tr key={field.id}>
                <td>{field.name}</td>
                <td>{field.country}</td>
                <td>{field.population}</td>
                <td>{field.latitude}</td>
                <td>{field.longitude}</td>
                <td className="text-center">
                  <button
                    className="tableButton"
                    onClick={() => deleteField(field)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
