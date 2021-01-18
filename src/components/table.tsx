import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import { ICities, CityProperties } from "../models/city";
import { sortAsc, sortDesc } from "../redux/actions/actionCreators";
import { SearchCity } from "./searchCity";
import { deleteDBField } from "../core/api";

type Props = {
  content: ICities[];
  title: string;
  removeField: (city: ICities) => void;
};

export const Table: React.FC<Props> = ({ content, title, removeField }) => {
  const [error, setError] = React.useState<string>("");
  const [sortAscState, setSortAscState] = React.useState<boolean>(true);
  const [tableInfo, setTableInfo] = React.useState<ICities[]>([]);
  const dispatch: Dispatch<any> = useDispatch();

  React.useEffect(() => {
    setTableInfo(content);
  }, [content]);

  const deleteField = (field: ICities) => {
    deleteDBField(field.id)
      .then(() => {
        deleteReduxField(field);
      })
      .catch((err) => {
        const error =
          err.response.status === 404
            ? "Resource not found"
            : "An unexpected error has occurred";
        setError(error);
      });
  };

  const deleteReduxField = React.useCallback(
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

  const search = (field: string) => {
    //TODO: See if I can change the types of obj and values
    let obj: any;
    let values: any[];
    if (field) {
      const info = content.filter((city: ICities) => {
        obj = JSON.parse(JSON.stringify(city));
        values = Object.keys(obj).map((key: string, i: number) => {
          return obj[key];
        });
        return JSON.stringify(values)
          .toLowerCase()
          .includes(field.toLowerCase());
      });
      setTableInfo(info);
    } else {
      setTableInfo(content);
    }
  };

  const showFilteredTable = () => {
    return tableInfo.map((field) => {
      return (
        <tr key={field.id}>
          <td>{field.name}</td>
          <td>{field.country}</td>
          <td>{field.population}</td>
          <td>{field.latitude}</td>
          <td>{field.longitude}</td>
          <td className="text-center">
            <button className="tableButton" onClick={() => deleteField(field)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="mb-5">
      <h1 className="text-center mb-4">{title}</h1>
      <div className="row">{error && <p className="error">{error}</p>}</div>
      <div className="row">{<SearchCity searchInput={search} />}</div>
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
          {showFilteredTable()}
        </tbody>
      </table>
    </div>
  );
};
